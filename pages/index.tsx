import Head from 'next/head'
import prisma from "../lib/prisma";
import {useState} from "react";
import Verifier from "../components/verifier";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const projects = await prisma.project.findMany({
        include: {
            users: {
                select:{
                    address:true
                }
            }
        }
    });
    return {
        props: { initProjects: projects },
    }
}

export default function Home({ initProjects }) {
    const [projects, setProjects] = useState(initProjects);

  return (
    <>
      <Head>
        <title>Smol Community Drive</title>
        <meta name="description" content="Smol Community Drive whitelist claim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Verifier projects={projects}/>
    </>
  )
}
