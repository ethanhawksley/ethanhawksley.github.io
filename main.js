document
  .getElementById("email-clipboard")
  .addEventListener("click", async () => {
    await navigator.clipboard.writeText("ethan@hawksley.dev");
  });
