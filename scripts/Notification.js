export class Notification {
  static inctance;

  constructor() {
    if (Notification.inctance) {
      return Notification.inctance;
    }

    this.timeout = 3000;

    Notification.inctance = this;
  }

  static getInstance() {
    if (!Notification.inctance) {
      Notification.inctance = new Notification();
    }
    return Notification.inctance;
  }

  show(message, isSuccess) {
    const notification = this.createNotification(message,isSuccess);
    document.body.append(notification);
    this.animationNotification(notification, true);

    setTimeout(() => {
      this.animationNotification(notification, false).then(() => {
        notification.remove();
      })
    }, this.timeout);
  }

  createNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? "notification_success" : "notification_error"}`;

    notification.textContent = message;

    return notification;
  }

  animationNotification(notification, show) {
    return new Promise((resolve) => {
      if (show) {
        requestAnimationFrame(() => {
          notification.classList.add('notification_show');
          resolve();
        })
      } else {
        notification.classList.remove('notification_show');
        setTimeout(resolve ,this.timeout);
      }
    });
  }
}
