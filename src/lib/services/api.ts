import { db, storage } from './firebase';

export async function getBio(): Promise<{status: number, body: any}> {
  const bioRef = db.collection('bio').doc('anfelo');
  const bioDoc = await bioRef.get();
  const data = bioDoc.data();
  if (data.avatar) {
    const storageRef = storage.refFromURL(data.avatar);
    const imgUrl = await storageRef.getDownloadURL();
    data.avatarUrl = imgUrl;
  }
  if (data !== null) {
    return {
      status: 200,
      body: data
    };
  }
}
