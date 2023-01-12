import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { EditButton, SwitchOn, SwitchOff } from "../../assets/Icons/index";
import { BsTrash } from "react-icons/bs";

const Item = styled(Paper)(({ theme }) => ({
  height: "100%",
}));

const initialDATA = [
  {
    marketTitle: "Amazon",
    url: "https://www.amazon.com/",
    logo: "https://pngimg.com/uploads/amazon/amazon_PNG24.png",
    active: true,
  },
  {
    marketTitle: "Noon",
    url: "https://www.noon.com/egypt-ar/",
    logo: "https://www.freelogovectors.net/wp-content/uploads/2020/11/noon-logo.png",
    active: true,
  },
  {
    marketTitle: "Alibaba",
    url: "https://www.alibaba.com/?src=sem_ggl&from=sem_ggl&cmpgn=9922923274&adgrp=97780323582&fditm=&tgt=kwd-934428634720&locintrst=&locphyscl=9112500&mtchtyp=e&ntwrk=g&device=c&dvcmdl=&creative=432240797169&plcmnt=&plcmntcat=&p1=&p2=&aceid=&position=&localKeyword=%3A%20alibaba&field=UG&gclid=CjwKCAiA9qKbBhAzEiwAS4yeDVaLTP3p7e2uj0cehr2EFm003JvVaZ4j_4SZcqiuGZpK33-rnetcghoCNloQAvD_BwE",
    logo: "https://s.alicdn.com/@img/tfs/TB1hVGkvVP7gK0jSZFjXXc5aXXa-365-49.svg",
    active: true,
  },
  {
    marketTitle: "Amazon",
    url: "https://www.amazon.com/",
    logo: "https://pngimg.com/uploads/amazon/amazon_PNG24.png",
    active: true,
  },
  {
    marketTitle: "Noon",
    url: "https://www.noon.com/egypt-ar/",
    logo: "https://www.freelogovectors.net/wp-content/uploads/2020/11/noon-logo.png",
    active: true,
  },
  {
    marketTitle: "Alibaba",
    url: "https://www.alibaba.com/?src=sem_ggl&from=sem_ggl&cmpgn=9922923274&adgrp=97780323582&fditm=&tgt=kwd-934428634720&locintrst=&locphyscl=9112500&mtchtyp=e&ntwrk=g&device=c&dvcmdl=&creative=432240797169&plcmnt=&plcmntcat=&p1=&p2=&aceid=&position=&localKeyword=%3A%20alibaba&field=UG&gclid=CjwKCAiA9qKbBhAzEiwAS4yeDVaLTP3p7e2uj0cehr2EFm003JvVaZ4j_4SZcqiuGZpK33-rnetcghoCNloQAvD_BwE",
    logo: "https://s.alicdn.com/@img/tfs/TB1hVGkvVP7gK0jSZFjXXc5aXXa-365-49.svg",
    active: true,
  },
];

const MarketsApis = ({ edit }) => {
  const handleEditing = (url, logo, marketTitle) => () => {
    edit(url, logo, marketTitle);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {initialDATA.map(({ url, logo, marketTitle, active }) => {
            return (
              <Grid
                sx={{
                  height: "13.125rem",
                  mb: "5.625rem",
                }}
                item
                xs={4}
              >
                <Item className="flex flex-col rounded-md overflow-hidden">
                  <a
                    className="flex-1 p-4 flex items-center justify-center"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className={`w-9/12 ${active ? "" : "grayscale"}`}
                      src={logo}
                      alt=""
                    />
                  </a>

                  <div
                    className="h-14 flex justify-center items-center gap-2"
                    style={{ backgroundColor: "rgb(32,125,175)" }}
                  >
                    <button className="h-8 w-8   flex justify-center items-center">
                      <img
                        className="w-6/10"
                        src={active ? SwitchOn : SwitchOff}
                        alt=""
                      />
                    </button>
                    <button className="h-8 w-8 bg-slate-50 rounded-full flex justify-center items-center">
                      <BsTrash className="" color={"red"}></BsTrash>
                    </button>
                    <button
                      onClick={handleEditing(url, logo, marketTitle)}
                      className="h-8 w-8 bg-slate-50 rounded-full flex justify-center items-center"
                    >
                      <img className="w-6/10" src={EditButton} alt="" />
                    </button>
                  </div>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default MarketsApis;
