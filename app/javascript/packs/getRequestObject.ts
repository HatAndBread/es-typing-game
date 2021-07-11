const getRequestObject = (method: string, body: any) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      "X-CSRF-Token": document.getElementsByName("csrf-token")[0].content,
    },
    body: JSON.stringify(body),
  };
};

export { getRequestObject };
