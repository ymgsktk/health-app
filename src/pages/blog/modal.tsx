import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../store/redux_action';
import { AppState } from '../../store/redux_store';
import './modal.css'
import { Post } from '../../interface/post';

interface ModalComponentProps {
  post: Post | null; // postが存在しない場合もあるのでnull許可
}

const ModalComponent: React.FC<ModalComponentProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state: AppState) => state.modal);

  console.log('Modal isOpen:', isOpen);
  console.log('Modal content:', content);

  const handleCloseModal = () => {
    dispatch(toggleModal(false)); // モーダルを閉じる
  };
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // イベントの伝播を止めて、モーダルが閉じるのを防ぐ
    event.stopPropagation();
  };

  return (
    <>
      {isOpen && post && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <div className='title'>
                <h2>{post.title}</h2>
                <p className='close' onClick={handleCloseModal}>×</p>
            </div>
            <div className='des'>{post.description}
            </div>
            <div className='img-des'>
                <img src={post.imageUrl} className='post-image'/>
                <p className='teamdes'>{post.teamdescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
