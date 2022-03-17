import {useEtherBalance, useEthers} from "@usedapp/core";
import {useEffect, useRef, useState} from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex, Image,
    Text, useDisclosure
} from "@chakra-ui/react";
import victims from '../csv/convertcsv.json'

export default function Verifier(projects) {
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
    const [isAVictim, setIsAVictim] = useState(false)
    const [chosenWl, setChosenWl] = useState({name:''});
    const [initialProjects, setInitialProjects] = useState(projects)
    const [userAccount, setUserAccount] = useState(undefined)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        setIsAVictim(false)
        handleVerify()
        getUser()
    }, [account])

    const handleVerify = () => {
        const victim = victims.filter(function(tx) {
            return (tx.From.toLowerCase() == String(account).toLowerCase());
        });
        if (victim[0]) {
            setIsAVictim(true)
            // console.log(_.findWhere(victims, {From: '0x820184bb9747e9762e7c13e2babf97af4c38fb0d'}))
        }
    }

    const getUser = async () => {
        const userAccount =  await fetch( '/api/getUser?address='+account).then(r => {
            return r.json();
        }).catch(e => e)

        setUserAccount(userAccount)
    }

    const handleSubmit = async () => {
        // @ts-ignore
        const body = { project:chosenWl.id,
            address:account,
        }

       const submitWl = await fetch( '/api/create', {
            method: "POST" ,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user:body}),
        }).then(r => {
            onClose()
            return r.json();
        }).catch(e => e)

        setInitialProjects(submitWl.projects ? submitWl : initialProjects)
        getUser()
    }
    return(
        <>
            <Flex w='100%' bgGradient={[ 'linear(to-b, blue.300, green.400)', ]} justifyContent={"center"} alignItems={"center"} py={20}>
                <Box w={'80vw'} bg={"whiteAlpha.500"} textAlign={"center"}
                     p={10}>
                    {!account && <>
                            <Text fontSize={"lg"} mb={4}> Connect wallet to verify if you are eligible for claiming.</Text>
                            <Button onClick={() => activateBrowserWallet()}>
                                Connect
                            </Button>
                        </>}

                        {account && <> <Text fontSize={20} fontWeight={"bold"} >{account}</Text> </> }
                        {(!isAVictim && account) && <Text> is not a SmolPenis victim </Text>}

                    <Box>
                        {userAccount?.user && <Text> has claimed whitelist on {userAccount?.user?.project.name} </Text>}

                        {(isAVictim && account && !userAccount?.user) && <Text> Please choose a project and claim your WL spot </Text>}

                        <Flex pt={10} flexWrap={"wrap"} gap={5} justifyContent={"center"}>

                            {initialProjects.projects && initialProjects.projects.map((p) => (
                                <Flex key={p.id} p={3} w={200} flexDirection={"column"} alignItems={"center"} bg={"whiteAlpha.400"} pb={3}>
                                    {/*Project Image*/}
                                    <Box w={"full"} h={'150px'} bg={"whiteAlpha.900"}> </Box>
                                    <Text fontSize={"lg"} fontWeight={"semibold"} pt={2}> {p.name}</Text>
                                    <Text> {p.users.length} / {p.totalWL}</Text>
                                    <Button mt={2} w={'80%'} colorScheme={"green"} isDisabled={!isAVictim || !account || (p.users.length >= p.totalWL) || userAccount.user} onClick={ () => {
                                        setChosenWl(p)
                                        onOpen()
                                    }}>Claim</Button>
                                </Flex>
                            ))}
                        </Flex>
                    </Box>
                </Box>
                <Flex _hover={{cursor:'pointer'}} position={"absolute"} bottom={15} fontSize={'18px'} bg={"whiteAlpha.400"} fontWeight={"bold"} w={'170px'} alignItems={"center"} justifyContent={"space-around"}
                      as={"a"} href="https://twitter.com/0xQueue" target="_blank"
                      ><Text>by @0xQueue</Text>  <Image  width={'30px'} src="https://img.icons8.com/color/48/000000/twitter--v1.png"/></Flex>
            </Flex>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Whitelist Confirm</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Proceed with {chosenWl.name} WL?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='green' ml={3} onClick={() => handleSubmit()}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
