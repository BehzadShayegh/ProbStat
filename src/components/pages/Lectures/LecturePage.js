import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Latex from "../../hooks/LATEX";
import "../../assets/stylesheet/lecture.css";

const LecturePage = () => {
  const [html, setHtml] = React.useState("");
  const [lectureId, setLecturId] = React.useState(0);
  const { id, lecture } = useParams();
  const history = useHistory();

  const data = window.config?.main?.sessions[+id]?.lectures[+lecture];
  const titleSession = window.config?.main?.sessions[+id]?.name;

  React.useEffect(() => {
    if (+lecture !== lectureId) {
      if (window.config?.main?.sessions[+id]?.lectures[lectureId]) {
        history.push(`/lectures/${id}/${lectureId}`);
      } else if (
        window.config?.main?.sessions[+lecture < lectureId ? +id + 1 : +id - 1]
          ?.lectures[0]
      ) {
        history.push(
          `/lectures/${+lecture < lectureId ? +id + 1 : +id - 1}/${0}`
        );
      } else {
        history.push("/lectures");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureId]);

  React.useEffect(() => {
    if (data && data.file) {
      const req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          setHtml(this.responseText);
        }
      };
      req.open("GET", data.file, false);
      req.send();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, history]);

  if (!data) {
    return (
      <div className="d-flex items-center	 justify-center	flex-col	 w-100">
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4 className="text-center">خطا در گرفتن محتوای جلسه </h4>
        <p className="text-center">
          لطفا مجددا از مباحث جلسه مد نظر خود را انتخاب کنید.
        </p>
      </div>
    );
  } else
    return (
      <section className="max-w-screen-xl mx-auto py-4 px-4 sm:px-8 relative">
        <div className="w-full bg-gray-50 absolute right-0 top-0 p-2 text-xl text-gray-600">
          {" "}
          {titleSession}{" "}
        </div>
        <div className="mt-9">
          <div className="py-4">
            <h4 className="text-2xl text-gray-800 font-semibold md:text-3xl">
              {data.title}
            </h4>
          </div>
          <div className="w-100 rounded-md ">
            <iframe
              style={{ width: "100%", height: "80vh", borderRadius: "16px" }}
              title="lecture one"
              src={data.streamLink}
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="w-full p-2 overflow-auto">
              <Latex>
                <div
                  className="text-justify"
                  style={{ minHeight: "50vh" }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </Latex>
            </div>
          </div>
        </div>
        <style>{`
        .cta-pr-btn:hover svg {
          transform: translateX(5px);
        }
      `}</style>
        <div className="inline-flex w-full justify-between mt-3">
          <button
            onClick={() => setLecturId(+lecture + 1)}
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            بعدی
          </button>
          <button
            onClick={() => setLecturId(+lecture - 1)}
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            قبلی
          </button>
        </div>
      </section>
    );
};

export default LecturePage;
