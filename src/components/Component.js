import "./Component.css";

export function Dummy_Rectangle() {
  const style = {
    width: "50px",
    height: "50px",
    backgroundColor: "white",
  };
  return <span style={style}></span>;
}

export const Title_Lv1 = ({ children }) => {
  return <p className="title-lv1">{children}</p>;
};
export const Title_Lv2 = ({ children }) => {
  return <p className="title-lv2">{children}</p>;
};
export const Text_Lv3 = ({ children }) => {
  return <p className="text-lv3">{children}</p>;
};

export function Wait_and_Complete({ icon, msgLv2Text }) {
  return (
    <>
      <div className="flex-center">{icon}</div>
      <div className="flex-center">
        <div className="msg-lv2">{msgLv2Text}</div>
      </div>
    </>
  );
}
