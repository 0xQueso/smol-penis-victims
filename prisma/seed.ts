
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const projectsInfo: Prisma.ProjectCreateManyInput[]  = [
    {
        name:'Smolegends',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1504323915958853634/VxtkQCja_400x400.jpg'
    },
    {
        name:'Birds and Blades',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1466279013874221060/jIJO-COI_400x400.jpg'
    },
    {
        name:'Smol Sharks',
        totalWL:50,
        profileImage:'https://pbs.twimg.com/profile_images/1499009474815795206/HX4M82pI_400x400.jpg'
    },
    {
        name:'Smulips',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1499871391532957703/pzoJqivJ_400x400.jpg'
    },
    {
        name:'Smol Bears ',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1499873438751674372/f4RHj3rT_400x400.jpg'
    },
    {
        name:'Smol Snack Shop',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1497981772348284930/QeksCbEw_400x400.jpg'
    },
    {
        name:'Sneaky Beans',
        totalWL:100,
        profileImage: 'https://pbs.twimg.com/profile_images/1502476878317162496/poLp2l61_400x400.jpg'
    },
    {
        name:'Bobots',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1488422964991168512/AOW9sdOm_400x400.jpg'
    },
    {
        name:'GorillaDao',
        totalWL:150,
        profileImage: 'https://pbs.twimg.com/profile_images/1498236015152037888/WQyh-rlE_400x400.jpg'
    },
    {
        name:'Tales Of Elleria',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1500138041888817154/ZTTo-1_4_400x400.jpg'
    },
    {
        name:'Trove Street Punks',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1498715878996729861/nuLj15Kl_400x400.jpg'
    },
    {
        name:'Mythics',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1496596736047030285/RlA9dtgh_400x400.png'
    },
    {
        name:'Smol Potions',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1496239996445073415/zdrlYu7x_400x400.png'
    },
    {
        name:'Elefrens',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1486282195002134529/ZEA5B8cn_400x400.jpg'
    },
    {
        name:'Smol Kevins',
        totalWL:50,
        profileImage: 'https://pbs.twimg.com/profile_images/1499839526109339650/7AN-rjxd_400x400.jpg'
    }
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