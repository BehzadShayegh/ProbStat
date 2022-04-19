import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { lecture, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 120}px`);
  };

  return (
    <div
      className="space-y-3 overflow-hidden mt-5 border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-1 flex items-center justify-between text-md text-gray-700 font-medium">
        {lecture.name}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>مبحث : {lecture.describe}</div>
        <div>
          {lecture.lectures.map((item, id) => (
            <Link
              to={`/probstat/lectures/${idx}/${id}`}
              className="text-gray-500"
            >
              <p>جلسه : {item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const LectureList = () => {
  const sessions = window.config["sessions"];

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto bg-white p-5 shadow rounded">
      <div className="space-y-3 text-center rounded">
        <p className="text-1xl text-gray-800">لیست مباحث</p>
      </div>
      <div className="mt-4 mx-auto">
        {sessions.map((item, idx) => (
          <Card idx={idx} lecture={item} />
        ))}
      </div>
    </section>
  );
};
export default LectureList;