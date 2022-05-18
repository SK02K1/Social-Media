import { Heading, Box, VStack, Button, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from 'app/features';

export const Home = () => {
  const { user } = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const { firstName, lastName } = user;
  return (
    <Box>
      <VStack spacing={8}>
        <Heading textAlign='center' m={4}>
          Home
        </Heading>
        <Text fontSize={24} textAlign='center'>
          👋🏻 Hellew{' '}
          <Text as='span' fontWeight={600}>
            {firstName} {lastName}
          </Text>
        </Text>
        <Button
          onClick={() => dispatch(handleLogout())}
          bg='red.500'
          color='white'
          _hover={{ bg: 'red.400' }}
        >
          Logout
        </Button>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          soluta dolores numquam ut sint obcaecati nesciunt. Non reiciendis
          iusto iure reprehenderit doloribus id, consectetur, ipsum dolorem
          fugit ut, odit aliquid natus incidunt expedita unde! Cumque deleniti
          illo praesentium nobis, soluta, autem quibusdam similique eaque
          numquam voluptate veritatis odit illum commodi nesciunt fugit nulla
          pariatur officiis cupiditate quod! Quam incidunt similique ducimus
          minus illum mollitia animi accusamus ex a suscipit quidem veniam neque
          nobis, earum commodi eveniet, sit ipsa. Dolor, non est veniam
          distinctio ab, tempora dicta assumenda nihil exercitationem enim
          recusandae? Distinctio fuga eum cum nemo in assumenda. Reiciendis
          voluptate veritatis hic quod, veniam ab perferendis facilis iure iusto
          molestiae rem consequuntur ullam dolorum qui. Nulla voluptatem commodi
          fugit in quos delectus praesentium consectetur maxime, totam quidem
          minus laborum iusto aliquam eveniet, recusandae alias blanditiis cum
          sed fugiat laudantium et porro non. Eum in optio quasi suscipit
          perferendis totam quis iure, earum amet voluptate dolorem ab nam.
          Perspiciatis rem autem minus suscipit. Dolorem atque nesciunt veniam,
          debitis cumque voluptatum voluptate totam, vero est quibusdam ullam
          porro. Voluptatem est necessitatibus, illum porro ab debitis, harum
          beatae voluptate asperiores sint minus voluptatum error cumque
          sapiente! Magni odio inventore unde, distinctio molestiae aspernatur
          mollitia provident qui, minima nostrum, dolor rerum temporibus ex
          voluptates odit nam? Molestias voluptates omnis sapiente, aperiam,
          corporis ipsam quaerat natus ab fuga, sequi non reprehenderit beatae.
          Distinctio porro, officia explicabo atque id, iure nobis sed animi ab
          voluptatibus facere excepturi quaerat a autem? Autem, temporibus
          provident excepturi, voluptas accusantium quaerat totam odio
          consequuntur neque dignissimos ipsum! Voluptate, reprehenderit
          nesciunt libero quae quidem quos aliquam consequuntur eius voluptas,
          ipsum quas explicabo sint nulla, consequatur deserunt. Distinctio a
          dolores iusto amet maiores rem sint repellendus ipsa! Et fugit nobis
          impedit harum possimus modi cum repudiandae totam reprehenderit
          quidem, rerum, a fuga hic, doloribus mollitia. Incidunt quis unde
          recusandae dolorem consequatur totam nemo placeat voluptate voluptates
          sapiente ab vel ullam aliquid dolores mollitia odit dolore saepe,
          deleniti, vero quibusdam tempore non maxime distinctio ipsam? Non
          placeat iusto sint nemo totam repellat aut ex mollitia veniam vitae
          eius ea iure eaque necessitatibus, minus quisquam hic magnam. Optio
          iure modi iste dolorum ad cum nulla corrupti blanditiis temporibus est
          perferendis facilis error repudiandae iusto porro, ducimus non ipsum
          placeat soluta excepturi doloribus id delectus, odit tempora? Velit
          beatae sunt, pariatur vitae harum laborum quae ratione fugiat
          perferendis cupiditate. Tenetur eaque nemo magni pariatur eum nulla
          corporis veritatis odio. Sapiente eum maxime similique excepturi,
          corporis quae pariatur necessitatibus, perferendis consequatur minus
          molestias, quod obcaecati! Quo molestiae maxime, sed eaque aspernatur
          ducimus mollitia? Itaque vero fuga consequatur minus nostrum
          dignissimos, nemo voluptate exercitationem minima, repudiandae aut
          magnam corporis atque vel! Velit cum consequuntur officiis saepe ullam
          nisi cumque dolorum. Ducimus illo nulla animi nesciunt recusandae
          earum aut. Eos, perferendis atque recusandae vitae sit eaque
          necessitatibus debitis fugiat beatae consequatur, rerum possimus
          suscipit unde accusantium ducimus consequuntur sequi numquam eius, non
          quos. Aperiam dignissimos hic dolorum, facilis cupiditate ullam
          aliquam voluptates, eligendi tempore obcaecati, impedit voluptatum?
          Doloremque quis dolorum ducimus earum molestiae nesciunt placeat optio
          ipsam, est nulla dignissimos, natus iure ratione cupiditate illo qui.
          Eum, voluptatum odio accusamus ullam aspernatur pariatur suscipit vel?
          Soluta obcaecati nesciunt repellat libero iste facilis consectetur
          omnis asperiores repudiandae praesentium provident possimus,
          perspiciatis cumque, tempora ullam! Odio cupiditate inventore aperiam?
          Sunt nulla consequatur commodi praesentium deleniti nihil expedita
          dicta exercitationem, facilis earum iusto voluptatibus harum in
          voluptates optio! Vitae ea voluptates quidem est, ut provident modi
          porro dolorum libero aut non enim molestias ipsam eum maxime quas
          soluta obcaecati dignissimos. Iste aperiam culpa quam ratione eveniet!
          Repudiandae ducimus nostrum nemo illo molestiae sint architecto ullam
          odio accusantium, recusandae fuga non in, earum doloremque, suscipit
          officiis inventore animi veniam ut? Cupiditate dolor distinctio esse
          et rem deleniti nobis temporibus ducimus. Dicta consequatur sed odio
          esse fugit ab, corrupti, eum ut reprehenderit voluptas voluptatem
          eaque numquam, obcaecati sint perspiciatis optio repellat.
          Consequuntur debitis soluta quasi dolor error, ea voluptas eius eaque
          doloremque itaque exercitationem ratione nostrum deleniti libero velit
          tenetur, nisi, quisquam nobis cum porro explicabo. Qui, rerum
          assumenda et sequi tempora maiores in incidunt quidem voluptatibus
          corporis eum dicta vitae amet, dolor quasi? Neque, consequatur ipsum.
          Voluptatem iste, impedit ab fuga totam nesciunt ullam omnis libero
          sint earum, pariatur fugiat, alias doloremque eligendi nisi quasi
          assumenda autem sequi veritatis repudiandae ut possimus.
          Necessitatibus, rerum exercitationem asperiores similique ab in
          dolores labore temporibus mollitia omnis facilis repellat quas sit.
          Autem laborum ab sed, atque similique numquam voluptate facere
          repudiandae corrupti asperiores doloribus odit sunt sapiente in,
          suscipit quas voluptatem consectetur eaque illum expedita optio
          adipisci pariatur amet? Quos, error quis numquam distinctio, enim cum
          quia placeat voluptate delectus, natus provident quaerat mollitia
          vitae rerum commodi iure iusto laudantium quasi nulla. Rerum similique
          quas consequuntur porro, nostrum laborum maiores dolorem aut
          laboriosam delectus dicta repellat, atque voluptas sed, quis ipsum
          odio! Error, consequuntur consequatur? Eaque quasi accusantium
          provident odio dolorum aliquam magni sed quas culpa, doloribus neque
          fugiat magnam nam fuga, nihil itaque numquam doloremque quisquam
          officiis commodi, nemo autem molestias! Quas aspernatur cumque sunt
          accusamus ut nostrum minima temporibus beatae incidunt consectetur
          dignissimos, animi cupiditate eos? Ab doloremque dolores quos! Qui
          magnam iure repudiandae porro architecto illo eum saepe numquam
          adipisci soluta necessitatibus itaque assumenda nulla veniam
          praesentium eaque dolores recusandae laborum, nam sapiente eius id
          consequatur doloribus est! Assumenda placeat iusto quaerat tenetur
          eaque eligendi veniam sunt molestias mollitia molestiae obcaecati eos
          suscipit, quo recusandae rem ad beatae quidem voluptatem accusantium
          illo autem libero odio? Quidem voluptatum laborum nemo molestias
          dicta, similique excepturi laudantium harum ab illum alias nihil
          explicabo maiores hic doloremque tempore cumque odit, id qui ullam, ex
          delectus eum dolorem aut! Vero obcaecati hic temporibus? Cumque
          nostrum facilis quod sequi qui? Repellendus expedita quae magni
          consectetur quidem asperiores cupiditate debitis, esse quia sunt
          impedit veritatis quam accusamus nam commodi minus reiciendis
          consequatur dolore aliquid et libero consequuntur molestias inventore
          perferendis. Omnis, delectus dignissimos? Deserunt, repudiandae!
          Necessitatibus officiis cum nostrum, consequuntur accusamus nemo ea
          odio nesciunt sunt, adipisci laboriosam illum.
        </Text>
      </VStack>
    </Box>
  );
};
