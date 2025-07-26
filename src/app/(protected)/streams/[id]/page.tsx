
import React from "react";
import StreamPageController from "@/controllers/streams/id/StreamPage.controller";

function page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <StreamPageController params={params}/>
  );
}

export default page;
