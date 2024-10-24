import chestIcon from '../../Components/Assets/SvgFiles/chest.svg';
import backIcon from '../../Components/Assets/SvgFiles/back.svg';
import legsIcon from '../../Components/Assets/SvgFiles/legs.svg';
import absIcon from '../../Components/Assets/SvgFiles/abs.svg';
import shouldersIcon from '../../Components/Assets/SvgFiles/shoulders.svg';
import armsIcon from '../../Components/Assets/SvgFiles/arms.svg';

export const Categories = [
    {
        id: 'chest',
        name: 'Chest',
        icon:chestIcon,

    },
    {
        id: 'back',
        name: 'Back',
        icon:backIcon,
    },
    {
        id: 'legs',
        name: 'Legs',
        icon:legsIcon,
    },
    {
        id: 'abs',
        name: 'Abs',
        icon:absIcon,
    },
    {
        id: 'shoulders',
        name: 'Shoulders',
        icon:shouldersIcon,
    },
    {
        id: 'arms',
        name: 'Arms',
        icon:armsIcon,
    }
    
];

export const videoData = {
    chest: [
      {
        id: 1,
        title: 'Bench Press',
        url: 'https://youtube.com/shorts/0cXAp6WhSj4?si=wK92nsPTy7iJc4xT',
      },
      {
        id: 2,
        title: 'Incline Bench Press',
        url: 'https://youtube.com/shorts/cq-4gME3IFY?si=DNo1bHpRUoUvMMwU',
      },
      {
        id: 3,
        title: 'Chest Fly',
        url: 'https://youtube.com/shorts/g3T7LsEeDWQ?si=q6M3zrp3GqRIfTKB',
      },
      {
        id: 4,
        title: 'Push-ups"',
        url: 'https://youtube.com/shorts/B3bYnimmpjM?si=L63AXPUoeEmTAx0z',
      },
      {
        id: 5,
        title: 'Cable Crossover',
        url: 'https://youtube.com/shorts/tGXIQR89-JE?si=03t0aHf6KkISFdhw',
      }
    ],

    back: [
      {
        id: 1,
        title: 'Deadlift',
        url: 'https://youtube.com/shorts/ZaTM37cfiDs?si=s3lLYqbGhk2Zrlvb',
      },
      {
        id: 2,
        title: 'Pull-ups',
        url: 'https://youtube.com/shorts/ZPG8OsHKXLw?si=Ke3vb2E9HE-Xdl2t',
      },
      {
        id: 3,
        title: 'Bent-Over Row',
        url: 'https://youtube.com/shorts/Nqh7q3zDCoQ?si=Dx4_SNFYYICpkuSd',
      },
      {
        id: 4,
        title: 'Lat Pulldown',
        url: 'https://youtube.com/shorts/aaAb20857Fs?si=RnSc_eyJQKxVxsvA',
      },
      {
        id: 5,
        title: 'T-Bar Row"',
        url: 'https://youtube.com/shorts/Ko9oyL1-Ojs?si=tmtaTgoLa-LJmQQF',
      },
      {
        id: 6,
        title: 'Romanian Deadlifts',
        url: 'https://youtube.com/shorts/rjRfOYWGeVg?si=2nduyTf3IGrgojPq',
      },
      {
        id: 7,
        title: 'Good Mornings',
        url: 'https://youtube.com/shorts/F786H3sBJP0?si=Gm1V1v1Vdi6wFRNE',
      },
      {
        id: 8,
        title: 'Hyperextensions',
        url: 'https://youtube.com/shorts/kxuoXofqNqM?si=He2I5iWAi3wpNu8g',
      },
      {
        id: 9,
        title: 'Superman Exercise',
        url: 'https://youtube.com/shorts/EtaCdOzH8cY?si=NLEroC4gpKtYQXKi',
      },
    ],

    legs: [
      {
        id: 1,
        title: 'Squats',
        url: 'https://youtube.com/shorts/SLOkdLLWj8A?si=Dk3k7qQTXmja52hl',
      },
      {
        id: 2,
        title: 'Leg Press',
        url: 'https://youtube.com/shorts/nDh_BlnLCGc?si=kktW2cklW4_0zC53',
      },
      {
        id: 3,
        title: 'Lunges',
        url: 'https://youtube.com/shorts/IEB8cd1BfQU?si=TFYQizZDeqSasD9R',
      },
      {
        id: 4,
        title: 'Bulgarian Split Squats',
        url: 'https://youtube.com/shorts/A3ctWjao8cc?si=8ZtwoAVvRlPoqpWG',
      },
      {
        id: 5,
        title: 'Step-Ups',
        url: 'https://youtube.com/shorts/PzDbmqL6qo8?si=8k8Xp4D3skBmHPJ5',
      },
      {
        id: 6,
        title: 'Hamstring Curls',
        url: 'https://youtube.com/shorts/iKhljBFCsvA?si=_R5yITqAXyc5nbs7',
      },
      {
        id: 7,
        title: 'Hip Thrusts',
        url: 'https://youtube.com/shorts/W86oVlnLqY4?si=R5Bx6oOBth_--Lp4',
      },
      {
        id: 8,
        title: 'Glute Bridge',
        url: 'https://youtube.com/shorts/X_IGw8U_e38?si=WbKhX7AfzqlWjQjS',
      },
      {
        id: 9,
        title: 'Cable Kickbacks',
        url: 'https://youtube.com/shorts/8GfY6ZG4Lyg?si=DU48SZ6hpmLWX8Go',
      },
      {
        id: 10,
        title: 'Calf Raises',
        url: 'https://youtube.com/shorts/AII23B8YjiY?si=_kJejjQYhgcFtXm9',
      },
      {
        id: 11,
        title: 'Seated Calf Raises',
        url: 'https://youtube.com/shorts/u_vD8C2IkcA?si=ZuKADWIMAegIj1Cy',
      }
    ],

    abs: [
      {
        id: 1,
        title: 'Crunches',
        url: 'https://youtube.com/shorts/eeJ_CYqSoT4?si=IbT9C2xWz_WU3C_t'
      },
      {
        id: 2,
        title: 'Sit-Ups',
        url: 'https://youtube.com/shorts/qXpYgvQ6_m4?si=dulsJnv_eAL7tQ7Q',
      },
      {
        id: 3,
        title: 'Cable Crunches',
        url: 'https://youtube.com/shorts/M1HeORCwv8A?si=MbkT7K4nOkbecvG5',
      },
      {
        id: 4,
        title: 'Leg Raises',
        url: 'https://youtube.com/shorts/aE5FRNzwtf4?si=Le0Mj-6ovwF2usBq',
      },
      {
        id: 5,
        title: 'Reverse Crunches',
        url: 'https://youtube.com/shorts/qL-5lbdOdTM?si=lsMR40GfHKeSHdpL',
      },
      {
        id: 6,
        title: 'Hanging Leg Raises',
        url: 'https://youtube.com/shorts/fQXbAeClHqY?si=JJugURmNbz05tYcD',
      },
      {
        id:7,
        title:"Russian Twists",
        url:'https://youtube.com/shorts/-cPtvFdT8dc?si=r8X-mvL3oR-4uphD'
      },
      {
        id:8,
        title:"Side Planks",
        url:'https://youtube.com/shorts/38unhLrdo50?si=m9AjK6rlDxc4Oudm'
      },
      {
        id:9,
        title:'Bicycle Crunches',
        url:'https://youtube.com/shorts/xl0qQeHXDmM?si=FfZZymShSkOsQjH0'
      }
    ],
    shoulders: [
      {
        id: 1,
        title: 'Overhead Press',
        url: 'https://youtube.com/shorts/DN3WXJlB1Q4?si=1RKzBkOC0brC0Z8S'
      },
      {
        id: 2,
        title: 'Lateral Raise',
        url: 'https://youtube.com/shorts/xyK8UiC-BUw?si=NKwJ5NsrgyjwgaGy',
      },
      {
        id: 3,
        title: 'Front Raise',
        url: 'https://youtube.com/shorts/yHx8wPv4RPo?si=VJhDbDv_Brjx7OBH',
      },
      {
        id: 4,
        title: 'Arnold Press',
        url: 'https://youtube.com/shorts/g4GUrEFoBxY?si=YV2K0PONMgK5g7fg',
      },
      {
        id: 5,
        title: 'Shrugs',
        url: 'https://youtube.com/shorts/kG4qXCYvITg?si=jpCsbuE5_2jCs_N9',
      }
    ],
    arms: [
      {
        id: 1,
        title: 'Bicep Curls',
        url: 'https://youtube.com/shorts/803JIAWBj_c?si=lIJ-b3fXmJu_apGX',
      },
      {
        id: 2,
        title: 'Hammer Curls',
        url: 'https://youtube.com/shorts/zF2VlVIn74Y?si=BPMiJ8zPU2StAsd1',
      },
      {
        id: 3,
        title: 'Concentration Curls',
        url: 'https://youtube.com/shorts/YEgmqqn9obo?si=0xXJYFxBLdNSaOhJ',
      },
      {
        id: 4,
        title: 'Preacher Curls',
        url: 'https://youtube.com/shorts/Htw-s61mOw0?si=xMUXxR4oky8Y8Vad',
      },
      {
        id: 5,
        title: 'Tricep Dips',
        url: 'https://youtube.com/shorts/9llvBAV4RHI?si=_DZp7ZOxYdlbIWaP',
      },
      {
        id: 6,
        title: 'Tricep Pushdown',
        url: 'https://youtube.com/shorts/NvZKjiZ8NYc?si=Q3YFZErH6maQBiNz',
      },
      {
        id: 7,
        title: 'Overhead Tricep Extension',
        url: 'https://youtube.com/shorts/snoE9qAzt08?si=vXHvKkkUTUbGYW5_',
      },
      {
        id: 8,
        title: 'Skull Crushers',
        url: 'https://youtube.com/shorts/zR9gty7LUxE?si=Uz9y3IrsU7qXYKsy',
      }
    ]
  };
