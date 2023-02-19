import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.scss';

export const ImageGalleryItem = props => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const { id, src, tags, largeImageURL } = props;

  return (
    <li className={s.imageGalleryItem} key={id}>
      <img
        className={s.image}
        src={src}
        alt={tags}
        onClick={handleToggleModal}
      />
      {showModal && (
        <Modal
          onClose={handleToggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
