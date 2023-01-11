package com.ionicframework.starter;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class NotifyService extends Service {

	private NotificationManager nm;

	@Override
	public void onCreate() {
		nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
		super.onCreate();
	}

	@Override
	public IBinder onBind(Intent arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		sendNotif();
		return super.onStartCommand(intent, flags, startId);
	}

	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
	}

	void sendNotif() {
		Notification notif = new Notification(R.drawable.icon,
				"Notify!!", System.currentTimeMillis());
		Intent intent = new Intent(this, HelloCordova.class);
		intent.putExtra("id", 1);
		PendingIntent pIntent = PendingIntent.getActivity(this, 0, intent, 0);
		notif.setLatestEventInfo(this, "G.I. Joe",
				"G.I. Joe with id 1", pIntent);
		notif.flags |= Notification.FLAG_AUTO_CANCEL;
		nm.notify(1, notif);
	}

}
