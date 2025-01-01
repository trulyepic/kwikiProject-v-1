import { notification } from "antd";
import React from "react";

export const showInfoNotification = (message, description) => {
  notification.info({
    message: <span className="notification-text">{message}</span>,
    description: <span className="notification-text">{description}</span>,
    placement: "topRight",
    className: "notification-container",
  });
};

export const showErrorNotification = (message, description) => {
  notification.error({
    message: <span className="notification-error-text">{message}</span>,
    description: <span className="notification-error-text">{description}</span>,
    placement: "topRight",
    className: "notification-error-container",
  });
};

export const showSuccessNotification = (message, description) => {
  notification.success({
    message: <span className="notification-error-text">{message}</span>,
    description: <span className="notification-error-text">{description}</span>,
    placement: "topRight",
    className: "notification-error-container",
  });
};
