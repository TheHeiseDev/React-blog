import { useNavigate } from "react-router-dom";
import "./NoMatch.css";

import { Button, Result } from "antd";

export const NoMatch = ({ location }) => {
  const push = useNavigate();
  const backPage = () => {
    push("/", { replace: true });
  };

  return (
    <div className="noMatch">
      <Result
        status="404"
        title="404"
        subTitle="Запрашиваемая страница не найдена!"
        extra={
          <Button onClick={backPage} type="primary">
            Вернуться на Главную
          </Button>
        }
      />
    </div>
  );
};
