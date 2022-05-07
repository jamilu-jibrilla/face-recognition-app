import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 center">
        {"This magic Brain will detect faces in your pictures. Git it a try"}
      </p>
      <div className="center">
        <div className="pa4 form center br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 libk ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
