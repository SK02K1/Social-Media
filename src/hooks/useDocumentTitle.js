import { useState, useEffect } from 'react';

export const useDocumentTitle = (title) => {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = `${documentTitle} | sharemoment`;
  }, [documentTitle]);

  return { documentTitle, setDocumentTitle };
};
