import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Visibility,
  Email,
  TouchApp,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAnalyticsSummary, getEventsByType } from '../../services/analytics';

const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageTitle = styled(Typography)`
  font-size: 32px !important;
  font-weight: 600 !important;
  margin-bottom: 24px !important;
  color: ${({ theme }) => theme.text_primary};
`;

const StatsCard = styled(Card)`
  background: ${({ theme }) => theme.card} !important;
  border: 1px solid ${({ theme }) => theme.border} !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.2) !important;
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color || '#60A5FA'};
  color: white;
  margin-bottom: 16px;

  svg {
    font-size: 28px;
  }
`;

const StatValue = styled(Typography)`
  font-size: 36px !important;
  font-weight: 700 !important;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 0 !important;
`;

const StatLabel = styled(Typography)`
  font-size: 14px !important;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChartCard = styled(Card)`
  background: ${({ theme }) => theme.card} !important;
  border: 1px solid ${({ theme }) => theme.border} !important;
  border-radius: 12px !important;
  padding: 20px;
  margin-top: 20px;
`;

const COLORS = ['#60A5FA', '#34D399', '#F59E0B', '#EF4444', '#8B5CF6'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [pageViewData, setPageViewData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch summary
      const summaryData = await getAnalyticsSummary(30);
      setSummary(summaryData);

      // Fetch page view events for chart
      const events = await getEventsByType('page_view', 30);

      // Group by date
      const groupedByDate = events.reduce((acc, event) => {
        const date = new Date(event.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(groupedByDate)
        .map(([date, count]) => ({ date, views: count }))
        .slice(-14); // Last 14 days

      setPageViewData(chartData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const statsCards = [
    {
      icon: <TrendingUp />,
      label: 'Total Events',
      value: summary?.totalEvents || 0,
      color: '#60A5FA',
    },
    {
      icon: <Visibility />,
      label: 'Page Views',
      value: summary?.pageViews || 0,
      color: '#34D399',
    },
    {
      icon: <Email />,
      label: 'Contact Submissions',
      value: summary?.contactSubmissions || 0,
      color: '#F59E0B',
    },
    {
      icon: <TouchApp />,
      label: 'Total Project Views',
      value: summary?.popularProjects?.reduce((sum, p) => sum + p.view_count, 0) || 0,
      color: '#8B5CF6',
    },
  ];

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle variant="h4">Analytics Dashboard</PageTitle>

        <Grid container spacing={3}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StatsCard>
                  <CardContent>
                    <IconWrapper color={stat.color}>{stat.icon}</IconWrapper>
                    <StatValue>{stat.value.toLocaleString()}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </CardContent>
                </StatsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Page Views Chart */}
        {pageViewData.length > 0 && (
          <ChartCard>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
              Page Views (Last 14 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Popular Projects */}
        {summary?.popularProjects && summary.popularProjects.length > 0 && (
          <ChartCard>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
              Most Viewed Projects
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.popularProjects}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="title" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="view_count" fill="#60A5FA" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Project Views Distribution */}
        {summary?.popularProjects && summary.popularProjects.length > 0 && (
          <ChartCard>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
              Project Views Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summary.popularProjects}
                  dataKey="view_count"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.title}: ${entry.view_count}`}
                >
                  {summary.popularProjects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Recent Activity Summary */}
        <ChartCard>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
            Summary (Last 30 Days)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={`${summary?.totalEvents || 0} Total Events`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${summary?.pageViews || 0} Page Views`}
              color="success"
              variant="outlined"
            />
            <Chip
              label={`${summary?.contactSubmissions || 0} Contact Forms`}
              color="warning"
              variant="outlined"
            />
            <Chip
              label={`${summary?.popularProjects?.length || 0} Projects Tracked`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </ChartCard>
      </motion.div>
    </Container>
  );
};

export default Analytics;
