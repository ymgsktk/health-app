import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../store/redux_action';
import { AppState } from '../../store/redux_store';
import './modal.css'
import { Menu } from '../../interface/post';

interface ModalComponentProps {
  menu: Menu | null; 
}

const ModalComponent: React.FC<ModalComponentProps> = ({ menu }) => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state: AppState) => state.modal);

  console.log('Modal isOpen:', isOpen);
  console.log('Modal content:', content);

  const handleCloseModal = () => {
    dispatch(toggleModal(false)); 
  };
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {isOpen && menu && (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={handleContentClick}>
                <p className='close' onClick={handleCloseModal}>×</p>
                <div className='modal-border'>
                    <div className='img-controle'>
                        <img src={menu.imageUrl} className='menu-image'/>
                    </div>
                    <div  className='title'>
                        <h2>{menu.title}</h2>
                    </div>
                    <div className='des'>{menu.description}
                    </div>
                    <div className='calorie-table'>
                        <table className="food-table">
                            <thead>
                            <tr>
                                <th>Food</th>
                                <th>Serving</th>
                                <th>Calories</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Arrowroot</td>
                                <td>1 piece (33 g)</td>
                                <td>21 cal</td>
                            </tr>
                            <tr>
                                <td>Artichoke</td>
                                <td>1 piece (128 g)</td>
                                <td>56 cal</td>
                            </tr>
                            <tr>
                                <td>Asparagus</td>
                                <td>1 piece, small (12 g)</td>
                                <td>2 cal</td>
                            </tr>
                            <tr>
                                <td>Asparagus, cooked</td>
                                <td>1 portion (125 g)</td>
                                <td>19 cal</td>
                            </tr>
                            <tr>
                                <td>Azuki Beans</td>
                                <td>1 portion (60 g)</td>
                                <td>217 cal</td>
                            </tr>
                            <tr>
                                <td>Baked Beans</td>
                                <td>1 cup (253 g)</td>
                                <td>266 cal</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
