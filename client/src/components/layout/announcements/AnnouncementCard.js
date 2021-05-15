import React from "react";
import { Link } from "react-router-dom";

const AnnouncementCard = ({
  announcement: { _id, dateCreated, image, title, description, tags },
}) => {
  let date = new Date(dateCreated);
  return (
    //returns the Announcement card
    <div className="announcementCard blue">
      <Link className="announcementCard__img_link" to={`/announcements/${_id}`}>
        <img
          className="announcementCard__img"
          src={require(`../../../uploads/${image}`).default}
          alt={title}
        />
        {/* Image for the announcement */}
      </Link>
      <div className="announcementCard__text">
        <h1 className="announcementCard__title blue">
          {/* Title of the announcement */}
          <Link to={`/announcements/${_id}`}>{title}</Link>
        </h1>
        <div className="announcementCard__subtitle small">
          <i className="fas fa-calendar-alt mr-2"></i> {date.toDateString()}
          {/* {dateCreated.slice(0, 10)} */}
        </div>
        <div className="announcementCard__bar"></div>
        <div className="announcementCard__preview-txt">{description}</div>
        <ul className="announcementCard__tagbox">
          <li className="tag__item">
            {/* Tags for the announcement */}

            {tags.length !== 0 && (
              <i className="fas fa-tag mr-2">
                {tags.map((value, index) => {
                  return " " + value + (index < tags.length - 1 ? " | " : " ");
                })}
              </i>
            )}
          </li>
          <li>
            <Link className="tag__item btn-dark" to={`/announcements/${_id}`}>
              Read More..
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementCard;
