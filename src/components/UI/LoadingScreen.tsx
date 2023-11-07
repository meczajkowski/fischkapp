import ReactDOM from 'react-dom';
import styles from './LoadingScreen.module.css';

// components
import LoadingIcon from './Icons/LoadingIcon';

const portalElement = document.getElementById('overlays');

const LoadingScreen: React.FC = () => {
  if (!portalElement) {
    return null; // Render nothing if portalElement is null
  }
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <LoadingIcon />
        </div>,
        portalElement
      )}
    </>
  );
};
export default LoadingScreen;
