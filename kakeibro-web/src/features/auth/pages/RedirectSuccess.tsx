function RedirectSuccess() {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get('code');

  if (!window.opener) {
    return;
  }

  window.opener.postMessage(
    { event: 'OAuth', authCode },
    window.opener.location.origin
  );
  window.close();

  return <div></div>;
}

export { RedirectSuccess };
