import { db, storage } from './firebase';
import marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: function (code, lang) {
    if (typeof lang === 'undefined') {
      return hljs.highlightAuto(code).value;
    } else if (lang === 'nohighlight') {
      return code;
    } else {
      return hljs.highlight(lang, code).value;
    }
  }
});

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

  if (data !== null) {
    return {
      status: 200,
      body: {
        ...data,
        publishedOn: data.publishedOn.toDate(),
        html: marked(data.content)
      }
    };
  }
}
