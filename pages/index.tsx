import Head from 'next/head'
import prisma from "../lib/prisma";
import { Prisma } from '@prisma/client';
import {useState} from "react";
import Verifier from "../components/verifier";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";

type projectType = {
    name?: string,
    totalWL?: number,
    profileImage?: string,
    users?: any
}

export const getServerSideProps = async () => {
    const projects = await prisma.project.findMany({
        include: {
            users: {
                select: {
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
