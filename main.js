import "./style.css";

window.addEventListener("load", async () => {
  const registration = await navigator.serviceWorker
    .register("./sw.js")
    .catch(console.error);
  console.log("sw registered.");

  // push通知のsubscriptrionの入手
  let subscription = await registration.pushManager.getSubscription();

  const unsubscribeBtn = document.querySelector("#unsubscribe");
  const subscribeBtn = document.querySelector("#subscribe");
  const textarea = document.querySelector("#endpoint");

  unsubscribeBtn.addEventListener("click", async () => {
    if (subscription === null) {
      window.alert("購読しているservice workerがありません。");
      return;
    }

    const result = await subscription.unsubscribe();
    window.alert(result ? "購読解除成功" : "購読解除失敗");
  });

  subscribeBtn.addEventListener("click", async () => {
    const publicKey = document.querySelector("#key").value;

    if (subscription !== null) {
      window.alert(
        "サブスクリプションがあるので購読解除を先に行ってください。"
      );
    }

    // subscribeされていない場合にsubscribeを実行
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });
  });

  console.log(textarea);
  subscription
    ? (textarea.value = JSON.stringify(subscription))
    : console.log("subscriptionなし");
});
