import ReactGA from 'react-ga4';
import { supabase } from './supabaseClient';

// Initialize Google Analytics 4
export const initGA = () => {
  const measurementId = process.env.REACT_APP_GA4_MEASUREMENT_ID;

  if (measurementId && process.env.NODE_ENV === 'production') {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
    console.log('[Analytics] Google Analytics 4 initialized');
  } else {
    console.log('[Analytics] GA4 not initialized (development mode or missing ID)');
  }
};

// Track page views
export const trackPageView = (path) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: 'pageview', page: path });
  }

  // Also track in Supabase
  trackEvent({
    event_type: 'page_view',
    event_category: 'navigation',
    page_url: path,
  });
};

// Track custom events
export const trackEvent = async (params) => {
  const {
    event_type,
    event_category,
    event_label,
    event_value,
    page_url,
    metadata,
  } = params;

  // Send to Google Analytics
  if (process.env.NODE_ENV === 'production' && event_type) {
    ReactGA.event({
      category: event_category || 'general',
      action: event_type,
      label: event_label,
      value: event_value,
    });
  }

  // Store in Supabase for custom analytics
  try {
    const { error } = await supabase.from('analytics_events').insert([
      {
        event_type,
        event_category,
        event_label,
        event_value,
        page_url: page_url || window.location.pathname,
        referrer: document.referrer || null,
        session_id: getSessionId(),
        user_agent: navigator.userAgent,
        metadata: metadata || null,
      },
    ]);

    if (error) {
      console.error('[Analytics] Error storing event:', error);
    }
  } catch (err) {
    console.error('[Analytics] Error tracking event:', err);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, category = 'button') => {
  trackEvent({
    event_type: 'button_click',
    event_category: category,
    event_label: buttonName,
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent({
    event_type: 'form_submission',
    event_category: 'engagement',
    event_label: formName,
    event_value: success ? 1 : 0,
    metadata: { success },
  });
};

// Track project views
export const trackProjectView = async (projectId, projectTitle) => {
  // Track in GA4
  trackEvent({
    event_type: 'project_view',
    event_category: 'content',
    event_label: projectTitle,
    metadata: { project_id: projectId },
  });

  // Store in project_views table
  try {
    const { error } = await supabase.from('project_views').insert([
      {
        project_id: projectId,
        session_id: getSessionId(),
        user_agent: navigator.userAgent,
      },
    ]);

    if (error) {
      console.error('[Analytics] Error storing project view:', error);
    }
  } catch (err) {
    console.error('[Analytics] Error tracking project view:', err);
  }
};

// Track section views (when user scrolls to a section)
export const trackSectionView = (sectionName) => {
  trackEvent({
    event_type: 'section_view',
    event_category: 'engagement',
    event_label: sectionName,
  });
};

// Track downloads (resume, etc.)
export const trackDownload = (fileName) => {
  trackEvent({
    event_type: 'download',
    event_category: 'engagement',
    event_label: fileName,
  });
};

// Track external link clicks
export const trackExternalLink = (url, linkName) => {
  trackEvent({
    event_type: 'external_link',
    event_category: 'outbound',
    event_label: linkName || url,
    metadata: { url },
  });
};

// Track errors
export const trackError = (errorMessage, errorInfo = {}) => {
  trackEvent({
    event_type: 'error',
    event_category: 'technical',
    event_label: errorMessage,
    metadata: errorInfo,
  });
};

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }

  return sessionId;
};

// Get analytics summary (for admin dashboard)
export const getAnalyticsSummary = async (days = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get total events
    const { count: totalEvents, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    if (eventsError) throw eventsError;

    // Get total page views
    const { count: pageViews, error: pageViewsError } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'page_view')
      .gte('created_at', startDate.toISOString());

    if (pageViewsError) throw pageViewsError;

    // Get contact form submissions
    const { count: contactSubmissions, error: contactError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    if (contactError) throw contactError;

    // Get popular projects
    const { data: popularProjects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, view_count')
      .order('view_count', { ascending: false })
      .limit(5);

    if (projectsError) throw projectsError;

    return {
      totalEvents,
      pageViews,
      contactSubmissions,
      popularProjects,
    };
  } catch (error) {
    console.error('[Analytics] Error fetching summary:', error);
    return null;
  }
};

// Get events by type for charts
export const getEventsByType = async (eventType, days = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('analytics_events')
      .select('created_at, event_label')
      .eq('event_type', eventType)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Analytics] Error fetching events:', error);
    return [];
  }
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmission,
  trackProjectView,
  trackSectionView,
  trackDownload,
  trackExternalLink,
  trackError,
  getAnalyticsSummary,
  getEventsByType,
};
