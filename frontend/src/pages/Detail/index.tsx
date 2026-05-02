import { usePhotoDetail } from "../../hooks/usePhotoDetail";
import "./index.css";

function Detail() {
  const {
    title,
    setTitle,
    comment,
    setComment,
    location,
    setLocation,
    isEditting,
    setIsEditting,
    imageUrl,
    postedAt,
    handleSave,
  } = usePhotoDetail();

  const getContents = () => {
    if (!isEditting) {
      return (
        <div className="view-mode" id="viewMode">
          <div className="info-block">
            <p className="info-label">タイトル</p>
            <p className="info-value">{title}</p>
          </div>
          <div className="info-block">
            <p className="info-label">撮影場所</p>
            <p className="info-value">{location}</p>
          </div>
          <div className="info-block">
            <p className="info-label">コメント</p>
            <p className="info-value">{comment}</p>
          </div>
          <div className="info-block">
            <p className="info-label">投稿日時</p>
            <p className="info-value muted">{postedAt}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="edit-mode" id="editMode">
          <div className="field">
            <label htmlFor="title">タイトル</label>
            <input
              type="text"
              id="title"
              value={title}
              maxLength={32}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="char-count">{title?.length || 0} / 32</span>
          </div>
          <div className="field">
            <label htmlFor="location">撮影場所</label>
            <input
              type="text"
              id="location"
              value={location}
              maxLength={32}
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className="char-count">{location?.length || 0} / 32</span>
          </div>
          <div className="field">
            <label htmlFor="comment">コメント</label>
            <textarea
              id="comment"
              rows={6}
              maxLength={255}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <span className="char-count">{comment?.length || 0} / 255</span>
          </div>
          <div className="field readonly">
            <label>投稿日時</label>
            <p className="info-value muted">{postedAt}</p>
          </div>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={!title.trim()}
          >
            保存する
          </button>
        </div>
      );
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-layout">
        <div className="photo-display">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="info-panel">
          <div className="panel-header">
            <span className="edit-label">編集</span>
            <label className="toggle">
              <input
                type="checkbox"
                id="editToggle"
                checked={isEditting}
                onChange={(e) => setIsEditting(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          {getContents()}
        </div>
      </div>
    </div>
  );
}

export default Detail;
