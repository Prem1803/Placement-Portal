import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { deleteAnnouncementById } from "../../../api/apiAnnouncement";

const UserAnnouncementCard = ({
  announcement: { _id, dateCreated, image, title, description, tags },
  user,
  token,
}) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const deleteAnnouncement = () => {
    //for deleting the announcement
    deleteAnnouncementById(_id, token)
      .then((data) => {
        addToast("Announcement Deleted", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        history.push(`/`); //redirects to the homepage after deleting the announcement
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editAnnouncement = () => {
    //editing the announcement
    history.push(`/announcements/${_id}/edit`); //redirects to the edit page
  };
  let date = new Date(dateCreated);

  return (
    //returns the Annoucement component
    <div className="announcementCard blue">
      <Link className="announcementCard__img_link" to={`/announcements/${_id}`}>
        <img className="announcementCard__img" src={image} alt={title} />
      </Link>

      <div className="announcementCard__text">
        <h1 className="announcementCard__title blue">
          <Link to={`/announcements/${_id}`}>{title}</Link>
        </h1>
        <div className="announcementCard__subtitle small">
          <i className="fas fa-calendar-alt mr-2"></i> {date.toDateString()}
        </div>
        <div className="announcementCard__bar"></div>
        <div className="announcementCard__preview-txt">{description}</div>
        <ul className="announcementCard__tagbox">
          <li className="tag__item btn-dark">
            {tags.length !== 0 && (
              <i className="fas fa-tag mr-2">
                {tags.map((value, index) => {
                  return " " + value + (index < tags.length - 1 ? " | " : " ");
                })}
              </i>
            )}
          </li>
          <li className="tag__item btn-dark">
            <Link to={`/announcements/${_id}`}>Read More..</Link>
          </li>
        </ul>
        <span style={{ paddingTop: "1rem" }}>
          <button
            className="tag tag-purple"
            style={{ float: "right" }}
            onClick={editAnnouncement}
          >
            <i className="fas fa-edit"></i> Edit
          </button>

          {user.type === 1 && (
            <button
              className="tag tag-purple"
              style={{ float: "right" }}
              onClick={deleteAnnouncement}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default UserAnnouncementCard;
