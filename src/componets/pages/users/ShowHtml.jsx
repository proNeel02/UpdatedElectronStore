import parse from "html-react-parser";

// this html used for pasring html coming from server
const ShowHtml = ({ htmlText }) => {
  const changeHtmlData = () => {
    return parse(htmlText, {
      replace: (node) => {
        //change
        if (node.name === "img") {
          node.attribs.class += " img-fluid";
          return node;
        }

        if (node.name === "table") {
          node.attribs.class +=
            " table table-bordered table-hover table-striped";
          return node;
        }
        return node;
      },
    });
  };

  return <div>{changeHtmlData(htmlText)}</div>;
};

export default ShowHtml;
