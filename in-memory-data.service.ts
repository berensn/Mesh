import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const Article = [
      {
        id: 1,
        author: "Nate Berens",
        title: "Fancy Meat",
        content: "Strip steak bresaola capicola tail cow chicken corned beef turkey rump ground round tri-tip. Swine tongue filet mignon ball tip jerky rump tenderloin meatball turkey jowl tail biltong turducken flank landjaeger. Pork chop ham hock ball tip porchetta burgdoggen tri-tip pork corned beef turkey shankle. Shank capicola flank sausage, andouille picanha tongue corned beef bresaola beef ribs ball tip. Rump andouille sausage, fatback tongue shank chuck pork chop ball tip ham hock. Turkey meatball bacon, kevin beef ribs burgdoggen pork loin.",
        tags: ["test", "lorum"],
        categories: ["blah"],
        publishDate: "2-12-2018",
        published: true
      },
      {
        id: 2,
        author: "Nate Berens",
        title: "Meat",
        content: "Tail pig ham hock, porchetta picanha ribeye tri-tip jowl fatback turducken andouille corned beef ground round sirloin. Flank jerky doner, chuck meatloaf ham hock cupim bresaola hamburger pork chop ground round pork belly ham salami rump. Drumstick porchetta flank short ribs. Leberkas capicola salami kielbasa, strip steak cupim shankle ham hock swine turducken pork belly. Jerky filet mignon bacon pork chop prosciutto, venison leberkas shoulder swine pork strip steak chicken ball tip. Pork chop ribeye chicken meatloaf swine sirloin spare ribs pancetta t-bone bresaola kevin pig andouille. Ham jowl ribeye frankfurter tri-tip beef ribs pork loin.",
        tags: ["pork", "bacon"],
        categories: ["meat"],
        publishDate: "2-12-2018",
        published: true
      }
    ];
    return { Article };
  }
}
