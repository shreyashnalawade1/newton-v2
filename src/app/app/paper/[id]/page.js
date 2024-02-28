"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ProfilePromt from "@/components/shared/ProfilePromt";
import { Button } from "@/components/ui/button";
import { getFileData } from "@/lib/services/uploadUtil";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { handlePayment } from "@/lib/services/paymentUtil";
import { handleCite } from "@/lib/services/fileUtil";
import { Document, Page, pdfjs } from "react-pdf";
import PDFViewer from "@/components/shared/PdfViewer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ViewPaper({ params }) {
  const { id } = params;
  const [data, setData] = useState();
  const [url, setUrl] = useState("");
  const [cite, setCite] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await getFileData(id);
      setData(res.data);
      setUrl(res.url);
    })();
  }, [id, cite]);
  const pbDate = new Date(data?.publishDate);
  return (
    <div>
      <div className="grid grid-cols-1 grid-flow-row  flex-grow md:flex lg:flex flex-row justify-center overflow-hidden ">
        {/* feed contianer */}
        <div className="row-start-2 w-full md:w-3/5 h-full border-r-2 border-r-slate-200 px-5 pt-3 flex flex-col ">
          <h1 className="border-b-2 border-b-slate-200 px-6 ">Preview</h1>
          <div className="flex-grow overflow-y-scroll  scrollbar-hide ">
            <embed
              src={url}
              className="scrollbar-hide h-screen w-full hidden lg:block mg:block"
              type="application/pdf"
            />
            <PDFViewer file={url}></PDFViewer>
          </div>
        </div>
        {/* sidebar */}

        <div className="w-full md:w-5/12 h-full  md:grid md:grid-rows-1 ">
          <div className="px-5 pt-3 text-sm overflow-hidden    h-full">
            <h3>Paper Information</h3>
            <div className="flex flex-wrap gap-2 text-xs pt-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{data?.title}</CardTitle>
                  <div className="flex gap-3 items-center">
                    {pbDate.toLocaleString("default", { month: "long" })}
                    {pbDate.getDate()}, {pbDate.getFullYear()}
                    <Badge variant={"outline"}>
                      {data?.numCitation} Citation
                    </Badge>
                  </div>
                  <CardDescription className="grid grid-cols-2 grid-flow-row gap-3">
                    <ProfilePromt
                      name={data?.authors[0]?.name}
                      src={data?.authors[0]?.img}
                    ></ProfilePromt>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-bold">Abstract:</span> {data?.abstract}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    onClick={async () => {
                      await handleCite(data?._id);
                      setCite((s) => !s);
                    }}
                  >
                    Cite Paper
                  </Button>
                  <Button
                    onClick={() => {
                      handlePayment(id);
                    }}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
