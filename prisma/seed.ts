
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const projectsInfo: Prisma.ProjectCreateManyInput[]  = [
    {
        name:'Birds and Blades',
        totalWL:50,
    },
    {
        name:'Smol Sharks',
        totalWL:50,
    },
    {
        name:'Smulips',
        totalWL:50,
    },
    {
        name:'Smolegends',
        totalWL:50,
    },
    {
        name:'Smol Bears ',
        totalWL:50,
    },
    {
        name:'Smol Snack Shop',
        totalWL:50,
    },
    {
        name:'Sneaky Beans',
        totalWL:100,
    },
    {
        name:'Bobots',
        totalWL:50,
    },
    {
        name:'GorillaDao',
        totalWL:150,
    },
    {
        name:'Tales Of Elleria',
        totalWL:50,
    },
    {
        name:'Trove Street Punks',
        totalWL:50,
    },
    {
        name:'Mythics',
        totalWL:50,
    },
    {
        name:'Smol Potions',
        totalWL:50,
    },
    {
        name:'Elefrens',
        totalWL:50,
    },
    {
        name:'Smol Kevins',
        totalWL:50,
    },
    {
        name:'SmolTest',
        totalWL:2,
    },
    {
        name:'SmolTest2',
        totalWL:5,
    },
    {
        name:'SmolTest3',
        totalWL:3,
    },
]

async function main() {
    await prisma.project.createMany({
        data: projectsInfo,
    });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })