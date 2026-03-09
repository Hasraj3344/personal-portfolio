import React from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
  ...props
}) => {
  const getOptimizedPaths = (originalSrc) => {
    const parts = originalSrc.split('/');
    const filename = parts[parts.length - 1];
    const nameWithoutExt = filename.split('.')[0];
    const pathWithoutFilename = parts.slice(0, -1).join('/');

    return {
      webp: `${pathWithoutFilename}/optimized/${nameWithoutExt}.webp`,
      fallback: `${pathWithoutFilename}/optimized/${filename}`,
      original: originalSrc
    };
  };

  const paths = getOptimizedPaths(src);

  return (
    <picture>
      <source srcSet={paths.webp} type="image/webp" />
      <source srcSet={paths.fallback} />
      <img
        src={paths.original}
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
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.oneOf(['lazy', 'eager'])
};

export default OptimizedImage;
