const { addDynamicIconSelectors } = require('@iconify/tailwind');


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#05194D',
          25: '#C1C8D9',
          50: "#072267"
        },
        red: {
          DEFAULT: '#E12533',
          25: '#F7C9CC',
          100: '#E12533',
          blood: '#B1141F'
        },
        grey: {
          DEFAULT: '#333333',
          5: '#F2F2F2',
          10: '#E5E5E5',
          20: '#1A1A1A',
          30: '#F9F9F9',
          40: "#666666",
          80: "#333333"
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(225, 37, 51, 1) 0%, rgba(177, 20, 31, 1) 100%)',
        'blue-gradient': 'linear-gradient(90deg, #000000, #072267, #035371)',
      },
      fontFamily: {
        'GothamBold': ['GothamBold'],
        'GothamBoldItalic': ['GothamBoldItalic'],
        'GothamBook': ['GothamBook'],
        'GothamBookItalic': ['GothamBookItalic'],
        'GothamLight': ['GothamLight'],
        'GothamLightItalic': ['GothamLightItalic'],
        'GothamMedium': ['GothamMedium'],
        'GothamMediumItalic': ['GothamMediumItalic'],

        'GothamRoundedBold': ['GothamRoundedBold'],
        'GothamRoundedLight': ['GothamRoundedLight'],
        'GothamRoundedLightItalic': ['GothamRoundedLightItalic'],
        'GothamRoundedMedium': ['GothamRoundedMedium'],
        'GothamRoundedMediumItalic': ['GothamRoundedMediumItalic'],

        'Montserrat-Black': ['Montserrat-Black'],
        'Montserrat-BlackItalic': ['Montserrat-BlackItalic'],
        'Montserrat-Bold': ['Montserrat-BoldItalic'],
        'Montserrat-ExtraBold': ['Montserrat-ExtraBold'],
        'Montserrat-ExtraBoldItalic': ['Montserrat-ExtraBoldItalic'],
        'Montserrat-ExtraLight': ['Montserrat-ExtraLight'],
        'Montserrat-ExtraLightItalic': ['Montserrat-ExtraLightItalic'],
        'Montserrat-Italic': ['Montserrat-Italic'],
        'Montserrat-Light': ['Montserrat-Light'],
        'Montserrat-LightItalic': ['Montserrat-LightItalic'],
        'Montserrat-Medium': ['Montserrat-Medium'],
        'Montserrat-MediumItalic': ['Montserrat-MediumItalic'],
        'Montserrat-Regular': ['Montserrat-Regular'],
        'Montserrat-SemiBold': ['Montserrat-SemiBold'],
        'Montserrat-SemiBoldItalic': ['Montserrat-SemiBoldItalic'],
        'Montserrat-Thin': ['Montserrat-Thin'],
        'Montserrat-ThinItalic': ['Montserrat-ThinItalic'],

        'Athelas-Bold': ['Athelas-Bold'],
        'Athelas-BoldItalic': ['Athelas-BoldItalic'],
        'Athelas-Italic': ['Athelas-Italic'],
        'Athelas-Regular': ['Athelas-Regular'],

        'Sacramento-Regular': ['Sacramento-Regular'],

        'Myriad-Pro-Regular': ['Myriad-Pro-Regular'],
        'Myriad-Font': ['Myriad-Font'],

        'Lato-Black': ['Lato-Black'],
        'Lato-BlackItalic': ['Lato-BlackItalic'],
        'Lato-Bold': ['Lato-Bold'],
        'Lato-BoldItalic': ['Lato-BoldItalic'],
        'Lato-Italic': ['Lato-Italic'],
        'Lato-Light': ['Lato-Light'],
        'Lato-LightItalic': ['Lato-LightItalic'],
        'Lato-Regular': ['Lato-Regular'],
        'Lato-Thin': ['Lato-Thin'],
        'Lato-ThinItalic': ['Lato-ThinItalic'],

        'Poppins-Black': ['Poppins-Black'],
        'Poppins-BlackItalic': ['Poppins-BlackItalic'],
        'Poppins-Bold': ['Poppins-BoldItalic'],
        'Poppins-ExtraBold': ['Poppins-ExtraBold'],
        'Poppins-ExtraBoldItalic': ['Poppins-ExtraBoldItalic'],
        'Poppins-ExtraLight': ['Poppins-ExtraLight'],
        'Poppins-ExtraLightItalic': ['Poppins-ExtraLightItalic'],
        'Poppins-Italic': ['Poppins-Italic'],
        'Poppins-Light': ['Poppins-Light'],
        'Poppins-LightItalic': ['Poppins-LightItalic'],
        'Poppins-Medium': ['Poppins-Medium'],
        'Poppins-MediumItalic': ['Poppins-MediumItalic'],
        'Poppins-Regular': ['Poppins-Regular'],
        'Poppins-SemiBold': ['Poppins-SemiBold'],
        'Poppins-SemiBoldItalic': ['Poppins-SemiBoldItalic'],
        'Poppins-Thin': ['Poppins-Thin'],
        'Poppins-ThinItalic': ['Poppins-ThinItalic'],

        'Roboto-Black': ['Roboto-Black'],
        'Roboto-BlackItalic': ['Roboto-BlackItalic'],
        'Roboto-Bold': ['Roboto-Bold'],
        'Roboto-BoldItalic': ['Roboto-BoldItalic'],
        'Roboto-Italic': ['Roboto-Italic'],
        'Roboto-Light': ['Roboto-Light'],
        'Roboto-LightItalic': ['Roboto-LightItalic'],
        'Roboto-Medium': ['Roboto-Medium'],
        'Roboto-MediumItalic': ['Roboto-MediumItalic'],
        'Roboto-Regular': ['Roboto-Regular'],
        'Roboto-Thin': ['Roboto-Thin'],
        'Roboto-ThinItalic': ['Roboto-ThinItalic'],

        'NunitoSans-Black': ['NunitoSans-Black'],
        'NunitoSans-BlackItalic': ['NunitoSans-BlackItalic'],
        'NunitoSans-Bold': ['NunitoSans-BoldItalic'],
        'NunitoSans-ExtraBold': ['NunitoSans-ExtraBold'],
        'NunitoSans-ExtraBoldItalic': ['NunitoSans-ExtraBoldItalic'],
        'NunitoSans-ExtraLight': ['NunitoSans-ExtraLight'],
        'NunitoSans-ExtraLightItalic': ['NunitoSans-ExtraLightItalic'],
        'NunitoSans-Italic': ['NunitoSans-Italic'],
        'NunitoSans-Light': ['NunitoSans-Light'],
        'NunitoSans-LightItalic': ['NunitoSans-LightItalic'],
        'NunitoSans-Medium': ['NunitoSans-Medium'],
        'NunitoSans-MediumItalic': ['NunitoSans-MediumItalic'],
        'NunitoSans-Regular': ['NunitoSans-Regular'],
        'NunitoSans-SemiBold': ['NunitoSans-SemiBold'],
        'NunitoSans-SemiBoldItalic': ['NunitoSans-SemiBoldItalic'],

        'Metropolis-Black': ['Metropolis-Black'],
        'Metropolis-BlackItalic': ['Metropolis-BlackItalic'],
        'Metropolis-Bold': ['Metropolis-BoldItalic'],
        'Metropolis-ExtraBold': ['Metropolis-ExtraBold'],
        'Metropolis-ExtraBoldItalic': ['Metropolis-ExtraBoldItalic'],
        'Metropolis-ExtraLight': ['Metropolis-ExtraLight'],
        'Metropolis-ExtraLightItalic': ['Metropolis-ExtraLightItalic'],
        'Metropolis-Italic': ['Metropolis-Italic'],
        'Metropolis-Light': ['Metropolis-Light'],
        'Metropolis-LightItalic': ['Metropolis-LightItalic'],
        'Metropolis-Medium': ['Metropolis-Medium'],
        'Metropolis-MediumItalic': ['Metropolis-MediumItalic'],
        'Metropolis-Regular': ['Metropolis-Regular'],
        'Metropolis-SemiBold': ['Metropolis-SemiBold'],
        'Metropolis-SemiBoldItalic': ['Metropolis-SemiBoldItalic'],
        'Metropolis-Thin': ['Metropolis-Thin'],
        'Metropolis-ThinItalic': ['Metropolis-ThinItalic'],

        'Inter-Black': ['Inter-Black'],
        'Inter-Bold': ['Inter-BoldItalic'],
        'Inter-ExtraBold': ['Inter-ExtraBold'],
        'Inter-ExtraLight': ['Inter-ExtraLight'],
        'Inter-Light': ['Inter-Light'],
        'Inter-Medium': ['Inter-Medium'],
        'Inter-Regular': ['Inter-Regular'],
        'Inter-SemiBold': ['Inter-SemiBold'],
        'Inter-Thin': ['Inter-Thin'],

        'Forque': ['Forque'],
        'BlueCobra-Bold': ['BlueCobra-Bold'],
        'AlfaSlabOne-Regular': ['AlfaSlabOne-Regular'],
        'Anton-Regular': ['Anton-Regular'],


        'BuiltTitlingBd-Italic':['BuiltTitlingBd-Italic'],
        'BuiltTitlingBd-Regular':['BuiltTitlingBd-Regular'],
        'BuiltTitlingEl-Italic':['BuiltTitlingEl-Italic'],
        'BuiltTitlingEl-Regular':['BuiltTitlingEl-Regular'],
        'BuiltTitlingLt-Italic':['BuiltTitlingLt-Italic'],
        'BuiltTitlingLt-Regular':['BuiltTitlingLt-Regular'],
        'BuiltTitlingRg-Italic':['BuiltTitlingRg-Italic'],
        'BuiltTitlingRg-Regular':['BuiltTitlingRg-Regular'],
        'BuiltTitlingSb-Italic':['BuiltTitlingSb-Italic'],
        'BuiltTitlingSb-Regular':['BuiltTitlingSb-Regular'],

        'MazzardH-Black':['MazzardH-Black'],
        'MazzardH-BlackItalic':['MazzardH-BlackItalic'],

        'BigNoodleTitling':['BigNoodleTitling'],
        'BigNoodleTitlingOblique':['BigNoodleTitlingOblique'],

        'KenyanCoffeeBd-Italic':['KenyanCoffeeBd-Italic'],
        'KenyanCoffeeBd-Regular':['KenyanCoffeeBd-Regular'],
        'KenyanCoffeeRg-Italic':['KenyanCoffeeRg-Italic'],
        'KenyanCoffeeRg-Regular':['KenyanCoffeeRg-Regular'],

        'Helvetica':['Helvetica'],
        'Helvetica-Light':['Helvetica-Light'],
        'Helvetica-Oblique':['Helvetica-Oblique'],
        'Helvetica-Bold':['Helvetica-Bold'],
        'Helvetica-BoldOblique':['Helvetica-BoldOblique'],

        'MsMadi-Regular':['MsMadi-Regular'],
        'MuseoModerno':['MuseoModerno'],

        "Archivo": ['Archivo', 'sans-serif'], 

      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    // Iconify plugin
    addDynamicIconSelectors(),
  ],


}
