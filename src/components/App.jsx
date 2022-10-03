import Button from './SearchGallery/Button';
import ImageGallery from './SearchGallery/ImageGallery';
import ImageGalleryItem from './SearchGallery/ImageGalleryItem';
import SearchGallery from './SearchGallery/SearchGallery';
export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <SearchGallery />
      <ImageGallery>
        <ImageGalleryItem />
      </ImageGallery>
      <Button />
      {/* React homework template */}
    </div>
  );
};
