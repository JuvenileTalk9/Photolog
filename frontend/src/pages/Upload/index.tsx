import { useState } from "react";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import "./index.css";

function Upload() {
  const {
    image,
    title,
    setTitle,
    location,
    setLocation,
    comment,
    setComment,
    fileInpuitRef,
    previewUrl,
    handleUploadAreaClick,
    handleFileChange,
    handleDrop,
    handleUpload,
  } = useUploadPhoto();

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDropWithReset = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    handleDrop(e);
  };

  return (
    <div className="upload-page">
      <h1 className="page-title">新規投稿</h1>
      <div className="upload-layout">
        <div
          className={`image-area${isDragging ? " drag-over" : ""}`}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropWithReset}
        >
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            ref={fileInpuitRef}
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <img className="preview-img" src={previewUrl} alt="プレビュー" />
          ) : (
            <div className="image-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>クリックして画像を選択</p>
              <p className="sub">または、ここにドラッグ＆ドロップ</p>
            </div>
          )}
        </div>

        <form
          className="upload-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}
        >
          <div className="field">
            <label htmlFor="title">タイトル *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              maxLength={32}
              placeholder="タイトルを入力"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="char-count">
              <span id="titleCount">{title.length}</span> / 32
            </span>
          </div>

          <div className="field">
            <label htmlFor="location">撮影場所</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              maxLength={32}
              placeholder="撮影場所を入力"
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className="char-count">
              <span id="locationCount">{location.length}</span> / 32
            </span>
          </div>

          <div className="field">
            <label htmlFor="comment">コメント</label>
            <textarea
              id="comment"
              name="comment"
              rows={6}
              maxLength={255}
              value={comment}
              placeholder="コメントを入力"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <span className="char-count">
              <span id="commentCount">{comment.length}</span> / 255
            </span>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!title.trim() || !image}
          >
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
