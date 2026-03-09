import React from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  className,
  style,
  loading = 'lazy',
  ...props
}) => {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        {...props}
      />
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  webpSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.oneOf(['lazy', 'eager'])
};

export default OptimizedImage;
