import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../lib/prisma"
import victims from '../../csv/convertcsv.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('we in')
  if (req.method !== 'POST') {
        return res.status(405).json({message:'Method Not Allowed'})
  }
  try {
    const { user } = req.body;

    const victim = victims.filter(function(tx) {
      return (tx.From.toLowerCase() == String(user.address).toLowerCase());
    });
    // change to user.address
    if (!victim[0]) {
      return res.status(405).json({message:'You are not eligible for whitelist'})
    }

    const getProject = () => {
      return prisma.project.findUnique({
        where: { id: Number(user.project) }
      });
    };

    const countUserOnProject = () => {
      return prisma.user.aggregate({
        where: {
          projectId: proj.id,
        },
        _count: {
          projectId: true
        }
      });
    };

    const findUser = () => {
      return prisma.user.findFirst({
        where: {
          address: {
            contains: user.address,
            mode:'insensitive'
          },
        }
      });
    };

    const proj = await getProject();
    const count = await countUserOnProject();
    const userFound = await findUser();

    console.log(proj)
    console.log(count)
    console.log(userFound)

    if (count._count.projectId < proj.totalWL && !userFound) {
        const savedUser = await prisma.user.create({
          data: {
            address:user.address,
            projectId:proj.id
          }
        });

      const getProjects = () => {
        return prisma.project.findMany({
          include: {
            users: true
          }
        });
      };

      const projects = await getProjects();

      res.status(200).json({user:savedUser, projects:projects})
    } else {
      res.status(400).json({message: 'Already chosen WL or there are no spots left'})
    }
  } catch (e) {
    res.status(400).json({ message: 'something went wrong'})
  }

}
