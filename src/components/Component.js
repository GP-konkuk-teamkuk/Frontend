import "./Component.css";

export function Msg_Lv1({ children }) {
  return <div className="msg_lv1">{children}</div>;
}

export function Msg_Lv2({ children }) {
  return <div className="msg_lv2">{children}</div>;
}

export function Btn_Lv1({ text, onClick, children }) {
  return (
    <button className="btn_lv1" onClick={onClick}>
      {children === undefined ? text : children}
    </button>
  );
}

export function Btn_Lv2_Empty({ text, onClick, children }) {
  return (
    <button className="btn-lv2 btn-lv2-empty" onClick={onClick}>
      {children === undefined ? text : children}
    </button>
  );
}

export function Btn_Lv2_Full({ text, onClick, children }) {
  return (
    <button className="btn-lv2 btn-lv2-full" onClick={onClick}>
      {children === undefined ? text : children}
    </button>
  );
}

export function Div_Align_Center({ children }) {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return <div style={style}>{children}</div>;
}

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
      <Div_Align_Center>{icon}</Div_Align_Center>
      <Div_Align_Center>
        <Msg_Lv2>{msgLv2Text}</Msg_Lv2>
      </Div_Align_Center>
    </>
  );
}
