import { db, storage } from './firebase';

export async function getBio(): Promise<{ status: number; body: any }> {
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

export async function getProjects(): Promise<{ status: number; body: any }> {
  const projectsRef = db.collection('projects');
  const querySnapshot = await projectsRef.get();
  const projectsData = [];

  querySnapshot.forEach((doc) => {
    projectsData.push(doc.data());
  });

  return {
    status: 200,
    body: projectsData
  };
}

export async function getBlogArticles(): Promise<{
  status: number;
  body: any;
}> {
  const articlesRef = db.collection('articles');
  const querySnapshot = await articlesRef.get();
  const articlesData = [];

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    articlesData.push({
      ...docData,
      publishedOn: docData.publishedOn.toDate()
    });
  });

  return {
    status: 200,
    body: articlesData
  };
}

export async function getBlogArticle(
  slug: string
): Promise<{ status: number; body: any }> {
  const bioRef = db.collection('articles').doc(slug);
  const bioDoc = await bioRef.get();
  const data = bioDoc.data();

  if (data.slug) {
    const storageRef = storage.ref(`articles/${data.slug}.md`);
    const contentUrl = await storageRef.getDownloadURL();
    const contentRes = await fetch(contentUrl);
    const contentString = await streamToString(contentRes.body);
    data.content = contentString;
  }

  if (data !== null) {
    return {
      status: 200,
      body: {
        ...data,
        publishedOn: data.publishedOn.toDate()
      }
    };
  }
}

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
