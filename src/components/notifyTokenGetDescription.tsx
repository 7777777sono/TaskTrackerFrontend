import Image from "next/image";
import Link from "next/link";

const NotifyTokenGetDescription = () => {
  return (
    <>
      <div>
        <h2>LINE Notify アクセストークン発行方法</h2>
      </div>
      <div>
        <h4>
          1. 以下のリンクからLINE
          Notify公式サイトへアクセスし、右上のログインをクリック
        </h4>
        <Link href="https://notify-bot.line.me/ja/" legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            LINE Notify公式サイト
          </a>
        </Link>
        <Image
          src="/images/line_notify_setting_description_1.jpg"
          alt="line_notify_setting_description_1"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4>2. クリックしたらログインする</h4>
        <Image
          src="/images/line_notify_setting_description_2.jpg"
          alt="line_notify_setting_description_2"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4>
          3.
          ログイン後、右上に表示されているアカウント名をクリックし「マイページ」をクリック
        </h4>
        <Image
          src="/images/line_notify_setting_description_3.jpg"
          alt="line_notify_setting_description_3"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4>4. 「マイページ」に移動したら「トークンを発行する」をクリック</h4>
        <Image
          src="/images/line_notify_setting_description_4.jpg"
          alt="line_notify_setting_description_4"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4>
          5. 任意のトークン名を決めて、「1:1でLine
          Notifyから通知を受け取る」を選択し、発行をクリック
        </h4>
        <Image
          src="/images/line_notify_setting_description_5.jpg"
          alt="line_notify_setting_description_5"
          width={300}
          height={200}
        />
      </div>
      <div>
        <h4>
          6.
          この画面で表示されたトークンをコピーして、上の入力箇所に張り付けて「登録」をクリック
        </h4>
        <Image
          src="/images/line_notify_setting_description_6.jpg"
          alt="line_notify_setting_description_6"
          width={300}
          height={200}
        />
      </div>
    </>
  );
};

export default NotifyTokenGetDescription;
