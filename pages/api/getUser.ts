import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { address } = req.query;

        console.log(address, 'req here')
        const fetchUser = () => {
            return prisma.user.findFirst({
                where: {
                    address: {
                        contains: String(address),
                        mode:'insensitive'
                    },
                },
                include: {
                    project:true
                }
            });
        };

        const user = await fetchUser();

        res.status(200).json({user})
    } catch (e) {
        res.status(400).json({ message: 'something went wrong'})
    }

}
