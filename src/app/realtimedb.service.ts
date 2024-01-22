import {inject, Injectable} from '@angular/core';
import { getDatabase, ref, set, Database} from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class RealtimedbService {
  constructor() {
  }

  //Replace /users with a websocket room id
    writeUserData(userId: string, name: string | null, email: string | null, imageUrl: string | null) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
  }
}
