const fonts = ['font-display', 'font-body', 'font-sans1', 'font-Arial-narrow', 'font-Arial', 'font-Arial-Black', 'font-Brush Script MT', 'font-Calibri',
    'Calibri-Light', 'font-Comic-Sans', 'font-Consolas', 'font-Comic-Sans-MS', 'font-Courier', 'font-Courier-New', 'font-Franklin-Gothic-Medium',
    'Geneva', 'font-Georgia', 'font-Iskoola-Pota', 'font-Ink-Free', 'font-Impact', 'font-Leelawadee-UI', 'font-Lucida-Bright', 'font-Lucida-Console',
    'Lucida-Handwriting', 'font-Lucida-Sans', 'font-Luminari', 'font-MS-Gothic', 'font-MV-Boli', 'font-MS-UI-Gothic', 'font-NSimSun', 'font-papyrus',
    'Segoe-Print', 'font-Segoe-Script', 'font-Segoe-UI', 'font-Symbol', 'font-Tahoma', 'font-Times-New-Roman', 'font-Thai', 'font-Trebuchet-MS', 'font-Trattatello',
    'Westminster'];

// const fonts1 = ['font-Sans2', 'font-Tangerine', 'font-Comic-Neue', 'font-Calligraffitti', 'font-Libre-Franklin', 'font-Nanum-Brush-Script', 'font-Abril-Fatface',
// 'font-Bebas-Neue', 'font-Lobster-Two', 'font-Pacifico', 'font-Tangerine', 'font-Comic-Neue', 
const fonts1 = ['font-GothamBold', 'font-GothamBoldItalic', 'font-Impact', 'font-GothamBook', 'font-GothamBookItalic', 'font-GothamLight', 'font-GothamLightItalic', 'font-GothamMedium', 'font-GothamMediumItalic',
    'font-GothamRoundedBold', 'font-GothamRoundedLight', 'font-GothamRoundedLightItalic', 'font-GothamRoundedMedium', 'font-GothamRoundedMediumItalic',
    'font-Montserrat-Black', 'font-Montserrat-Black', 'font-Montserrat-BlackItalic', 'font-Montserrat-Bold', 'font-Montserrat-ExtraBold', 'font-Montserrat-ExtraBoldItalic', 'font-Montserrat-ExtraLight',
    'font-Montserrat-ExtraLightItalic', 'font-Montserrat-Italic', 'font-Montserrat-Light', 'font-Montserrat-LightItalic', 'font-Montserrat-Medium', 'font-Montserrat-MediumItalic', 'font-Montserrat-Regular',
    'font-Montserrat-SemiBold', 'font-Montserrat-SemiBoldItalic', 'font-Montserrat-Thin', 'font-Montserrat-ThinItalic','font-Montserrat', 
    'font-Athelas-Bold', 'font-Athelas-BoldItalic', 'font-Athelas-Italic','font-Athelas-Regular', 'font-MyriadFont', 'font-Myriad-Font', 'font-Myriad-Pro-Regular',
    'Lato-Black','Lato-BlackItalic','Lato-Bold','Lato-BoldItalic','Lato-Italic','Lato-Light','Lato-LightItalic','Lato-Regular','Lato-Thin','Lato-ThinItalic',
    'font-Poppins-Black', 'font-Poppins-Black', 'font-Poppins-BlackItalic', 'font-Poppins-Bold', 'font-Poppins-ExtraBold', 'font-Poppins-ExtraBoldItalic', 'font-Poppins-ExtraLight',
    'font-Poppins-ExtraLightItalic', 'font-Poppins-Italic', 'font-Poppins-Light', 'font-Poppins-LightItalic', 'font-Poppins-Medium', 'font-Poppins-MediumItalic', 'font-Poppins-Regular',
    'font-Poppins-SemiBold', 'font-Poppins-SemiBoldItalic', 'font-Poppins-Thin', 'font-Poppins-ThinItalic',
    'font-NunitoSans-Black', 'font-NunitoSans-Black', 'font-NunitoSans-BlackItalic', 'font-NunitoSans-Bold', 'font-NunitoSans-ExtraBold', 'font-NunitoSans-ExtraBoldItalic', 'font-NunitoSans-ExtraLight',
    'font-NunitoSans-ExtraLightItalic', 'font-NunitoSans-Italic', 'font-NunitoSans-Light', 'font-NunitoSans-LightItalic', 'font-NunitoSans-Medium', 'font-NunitoSans-MediumItalic', 'font-NunitoSans-Regular',
    'font-NunitoSans-SemiBold', 'font-NunitoSans-SemiBoldItalic', 'font-NunitoSans-Thin', 'font-NunitoSans-ThinItalic',
    'NunitoSans-Black','NunitoSans-BlackItalic','NunitoSans-Bold','NunitoSans-BoldItalic','NunitoSans-Italic','NunitoSans-Light','NunitoSans-LightItalic',
    'NunitoSans-Regular','font-NunitoSans-Medium', 'font-NunitoSans-MediumItalic',
    'font-Metropolis-Black', 'font-Metropolis-Black', 'font-Metropolis-BlackItalic', 'font-Metropolis-Bold', 'font-Metropolis-ExtraBold', 'font-Metropolis-ExtraBoldItalic', 'font-Metropolis-ExtraLight',
    'font-Metropolis-ExtraLightItalic', 'font-Metropolis-Italic', 'font-Metropolis-Light', 'font-Metropolis-LightItalic', 'font-Metropolis-Medium', 'font-Metropolis-MediumItalic', 'font-Metropolis-Regular',
    'font-Metropolis-SemiBold', 'font-Metropolis-SemiBoldItalic', 'font-Metropolis-Thin', 'font-Metropolis-ThinItalic',  
    'font-Inter-Black','font-Inter-Bold','font-Inter-ExtraBold','font-Inter-ExtraLight','font-Inter-Light','font-Inter-Medium','font-Inter-Regular','font-Inter-SemiBold','font-Inter-Thin',
    'font-Forque','font-BlueCobra-Bold','font-AlfaSlabOne-Regular','font-Anton-Regular',
    'font-BuiltTitlingBd-Italic','font-BuiltTitlingBd-Regular','font-BuiltTitlingEl-Italic','font-BuiltTitlingEl-Regular','font-BuiltTitlingLt-Italic',
    'font-BuiltTitlingLt-Regular','font-BuiltTitlingRg-Italic','font-BuiltTitlingRg-Regular','font-BuiltTitlingSb-Italic','font-BuiltTitlingSb-Regular',
    'font-MazzardH-Black','font-MazzardH-BlackItalic','font-BigNoodleTitling','font-BigNoodleTitlingOblique',
    'font-KenyanCoffeeBd-Italic','font-KenyanCoffeeBd-Regular','font-KenyanCoffeeRg-Italic','font-KenyanCoffeeRg-Regular',
    'font-Helvetica','font-Helvetica-Light','font-Helvetica-Oblique','font-Helvetica-Bold','font-Helvetica-BoldOblique','MsMadi-Regular','MuseoModerno'

    ]

const texts = ['Text Format', 'italic', 'not-italic', 'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-medium',
    'font-semibold', 'font-bold', 'font-extrabold', 'justify-center', 'justify-start', 'justify-end', 'text-left', 'text-center', 'text-right', 'text-justify',
    'text-start', 'text-end', 'text-inherit', 'text-transparent', 'text-black', 'text-white', 'text-red-500', 'text-[#A52A2A]', 'text-[#1da1f2]', 'bg-[#1da1f2]', 'decoration-double',
    'underline', 'overline', 'line-through', 'no-underline', 'capitalize', 'lowercase', 'uppercase'];


export {fonts, fonts1,texts};