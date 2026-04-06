/**
 * \uc815\uc801 HTML\uc6a9 i18n \u2014 React messages.js / education\u00b7awards\u00b7cert \ub370\uc774\ud130\uc640 \ub9de\ucda4
 * PDF URL: `react-app/src/config/portfolioPages.js` \uc758 FIREBASE_STORAGE_DOWNLOAD_TOKENS \uc640 \ub3d9\uae30\ud654
 * localStorage \ud0a4: portfolioLang ('ko' | 'en')
 */
(function (global) {
  var LANG_KEY = 'portfolioLang'
  var PDF =
    'https://roykoh88.github.io/Portfolio/PDF/'

  var FIREBASE_STORAGE_BUCKET = 'yjkohproject.firebasestorage.app'
  var FIREBASE_STORAGE_DOWNLOAD_TOKENS = {
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/AI\uac1c\ubc1c\uc790 \uc218\ub8cc\uc99d.pdf': '73eae910-2ff1-4e92-bac5-e4d10848abe8',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub124\ud2b8\uc6cc\ud06c \uc218\ub8cc\uc99d.pdf': 'ade03022-8624-4dec-bb00-0dc8d18c1433',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub370\uc774\ud130 \ubd84\uc11d \uc218\ub8cc\uc99d.pdf': '9ee71e23-cb49-494d-b2bf-25ae143fc38e',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub3c4\ucee4 & \ucfe0\ubc84 \uc218\ub8cc\uc99d.pdf': '976bea00-eba5-4a42-b7b6-4966ea8f67aa',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a4 \uc218\ub8cc\uc99d.pdf': 'e4615cda-2181-4c37-af9b-c528293eb836',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a41 \uc218\ub8cc\uc99d.pdf': '11887c51-8313-41d6-bf99-03bfa94a8bc5',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a42 \uc218\ub8cc\uc99d.pdf': '4926ba48-bc9c-4956-8497-3c82b88e9062',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc11c\ubc84 \uad6c\uc131 \uc218\ub8cc\uc99d.pdf': '2698a634-dca3-490c-8360-4b2bdff60251',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc11c\ubc84 \uad6c\uc1311\ud68c\ucc28 \uc218\ub8cc\uc99d.pdf': '53227cd9-b2c1-4ae4-b35d-d3b70baa15a4',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc528\uc2a4\ucf541 \uc218\ub8cc\uc99d.pdf': 'b50426ac-31fe-46b7-85b7-077b0134eadc',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc528\uc2a4\ucf542 \uc218\ub8cc\uc99d.pdf': 'ad62f147-c2ff-4560-a0b0-163a049ffcaf',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5481 \uc218\ub8cc\uc99d.pdf': '1cf18e55-42a8-45e1-b796-a76a8d04b60d',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5482 \uc218\ub8cc\uc99d.pdf': '05f57cc9-b1d2-40c1-9a02-6c1edb69d50e',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5483 \uc218\ub8cc\uc99d.pdf': 'e31a6f01-0a52-4e5e-bc45-6238fc8e834c',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5484 \uc218\ub8cc\uc99d.pdf': '7a287b93-891a-4130-84ac-e5797654a8e2',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5485 \uc218\ub8cc\uc99d.pdf': 'ff083384-e059-4668-8e5d-b3127ff5c696',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5486 \uc218\ub8cc\uc99d.pdf': '9fe86d78-90ff-4298-9e53-610efdc1acde',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ud504\ub860\ud2b8&\ubc31\uc5d4\ub4dc\ud480\uc2a4\ud0dd\uac1c\ubc1c\uc790 \uc218\ub8cc\uc99d.pdf': '252cd855-d890-4152-a918-17a9f9484f4c',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ucd9c\uc11d \uc6b0\uc218\uc0c1.pdf': 'f44b0c3c-9b20-4f54-a002-29fcd63415ea',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud0dc\ub3c4 \uc6b0\uc218\uc0c1.pdf': 'ce6f46f5-eddf-4c7c-8027-879c82ed0379',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud504\ub85c\uc81d\ud2b8 \uc6b0\uc218\uc0c1.pdf': '23ab1ea8-fbd9-4f8f-bc3b-e5426022d2a8',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud559\uc2b5 \uc6b0\uc218\uc0c1.pdf': '5aa0844c-a7ee-445f-bc77-990467e11fdb',
    '\uc218\uc0c1/\ud734\uba3c \uac1c\uadfc\uc0c1.pdf': 'fd03a002-9ccf-4587-961d-ded3f16495a4',
    '\uc218\uc0c1/\ud734\uba3c \uc790\ub3d9\ud654 \ud504\ub85c\uc81d\ud2b8 \ucd5c\uc6b0\uc218\uc0c1.pdf': '51c0dd68-c878-45bb-98b1-cfda96f39f36',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_1.pdf': 'b81d29c8-f7ba-4930-ba9e-44afe510bbc0',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_2.pdf': '03456b8c-f420-47ad-843d-716b5049eef8',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_3.pdf': '85c65fe8-897a-4a88-a54f-d678a58f832e',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_4.pdf': 'b52c1575-f47b-44d3-bb04-0e3ec626187c',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_5.pdf': 'e5404eef-4989-42f0-9914-e16b4990e620',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_6.pdf': '8125b6e5-f45e-425e-a5fd-ebd017dc1ccb',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_7.pdf': 'e82effb3-2185-44b6-bf95-5a40b02e46be',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_8.pdf': '87088659-8b5c-46e1-aa64-179057140b15',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_9.pdf': '9070210f-7d85-4a66-974f-97a0af11802e',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_10.pdf': '909f4d58-2527-4d00-b104-a2981aad683a',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_11.pdf': '35e9a9e7-b02f-421f-8b4f-c973326f3113',
    '\uc790\uaca9\uc99d/\ub9ac\ub205\uc2a4\ub9c8\uc2a4\ud130.pdf': 'ebe7ac59-f1c4-4ea1-840a-ad904fc66a55',
  }

  function firebaseStorageDownloadUrl(objectPath, downloadToken) {
    var encoded = encodeURIComponent(objectPath)
    return 'https://firebasestorage.googleapis.com/v0/b/' + FIREBASE_STORAGE_BUCKET + '/o/' + encoded + '?alt=media&token=' + downloadToken
  }

  /** URL \uc778\ucf54\ub529\ub41c PDF \uc0c1\ub300 \uacbd\ub85c \u2192 \ub514\ucf54\ub529 (\uc790\uaca9\uc99d \ud589\ucc98\ub7fc \ud3f4\ub354\uba85\ub9cc \ub514\ucf54\ub529 \uc548 \ub41c \uacbd\uc6b0\ub294 \uc138\uadf8\uba3c\ud2b8\ubcc4 \ucc98\ub9ac) */
  function decodedPdfRelativePath(s) {
    if (!s) return ''
    try {
      return decodeURIComponent(s.replace(/\+/g, ' '))
    } catch (e) {
      return s.split('/').map(function (seg) {
        if (!/%[0-9A-Fa-f]{2}/.test(seg)) return seg
        try {
          return decodeURIComponent(seg.replace(/\+/g, ' '))
        } catch (e2) {
          return seg
        }
      }).join('/')
    }
  }

  function pdfUrl(encodedPathFromPdfRoot) {
    var objectPath = decodedPdfRelativePath(encodedPathFromPdfRoot)
    var token = FIREBASE_STORAGE_DOWNLOAD_TOKENS[objectPath]
    if (token) {
      return firebaseStorageDownloadUrl(objectPath, token)
    }
    return PDF + encodedPathFromPdfRoot
  }

  var MESSAGES = {
    ko: {
      meta: { title: 'Roy Koh | \uac1c\ubc1c \ud3ec\ud2b8\ud3f4\ub9ac\uc624', desc: '\uadf8\ub3d9\uc548 \uac1c\ubc1c\ud55c \ud504\ub85c\uc81d\ud2b8\uc640 \uacbd\ud5d8\uc744 \ub2f4\uc740 \ud3ec\ud2b8\ud3f4\ub9ac\uc624\uc785\ub2c8\ub2e4.' },
      nav: {
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        skills: 'Skills',
        awards: 'Award',
        certificates: 'Certificates',
        contact: 'Contact',
      },
      reactLinkTitle: 'React \ud3ec\ud2b8\ud3f4\ub9ac\uc624(\uba54\uc778)',
      reactLinkAria: 'React \uba54\uc778\uc73c\ub85c \uc774\ub3d9',
      header: {
        themeToDark: '\ub2e4\ud06c \ubaa8\ub4dc\ub85c \uc804\ud658',
        themeToLight: '\ub77c\uc774\ud2b8 \ubaa8\ub4dc\ub85c \uc804\ud658',
        themeDark: '\ub2e4\ud06c \ubaa8\ub4dc',
        themeLight: '\ub77c\uc774\ud2b8 \ubaa8\ub4dc',
        menuOpen: '\uba54\ub274 \uc5f4\uae30',
        menuClose: '\uba54\ub274 \ub2eb\uae30',
      },
      hero: {
        tag: 'Developer Portfolio',
        typing: '\uc548\ub155\ud558\uc138\uc694\n\uafc8\uc744 \uac1c\ubc1c\ud558\ub294 \uac1c\ubc1c\uc790\n Roy \uc785\ub2c8\ub2e4.',
        desc: '\uadf8\ub3d9\uc548 \ub9cc\ub4e4\uc5c8\ub358 \ud504\ub85c\uc81d\ud2b8\uc640 \uc0ac\uc6a9\ud55c \uae30\uc220\uc744 \uc815\ub9ac\ud55c \uacf5\uac04\uc785\ub2c8\ub2e4.',
        viewProjects: '\ud504\ub85c\uc81d\ud2b8 \ubcf4\uae30',
        viewReact: 'React\ub85c \ubcf4\uae30',
        reactBtnTitle: 'React \ud3ec\ud2b8\ud3f4\ub9ac\uc624(\uba54\uc778)',
        photoAlt: '\uace0\uc6a9\uc7ac \ud504\ub85c\ud544 \uc0ac\uc9c4',
        logoAlt: 'ROY.K \ub85c\uace0',
      },
      about: {
        title: 'About',
        name: '\uc774\ub984',
        nameValue: '\uace0\uc6a9\uc7ac',
        birth: '\uc0dd\ub144\uc6d4\uc77c',
        nameEn: '\uc601\ubb38',
        nameEnValue: 'Koh Yongjae',
        age: '\ub098\uc774',
        ageUnit: '(\ub9cc)',
        phoneLink: '\uc5f0\ub77d\ucc98',
        contactCta: 'contact',
        address: '\uc8fc\uc18c',
        role: '\uc9c0\uc6d0 \ubd84\uc57c',
        addressValue: '\uc11c\uc6b8\uc2dc \ub178\uc6d0\uad6c',
        roleValue: 'LLM Developer',
        photoAlt: '\uace0\uc6a9\uc7ac \ud504\ub85c\ud544 \uc0ac\uc9c4',
        intro: [
          '\uc548\ub155\ud558\uc138\uc694.',
          '\uafc8\uc744 \ucf54\ub4dc\ub85c \ub9cc\ub4dc\ub294 \uac1c\ubc1c\uc790 ROY(\uace0\uc6a9\uc7ac)\uc785\ub2c8\ub2e4. \uc0ac\uc6a9\ud558\ub294 \uc0ac\ub78c\uc774 \ud3b8\ud558\uace0 \uae30\ubd84 \uc88b\uac8c \uc4f8 \uc218 \uc788\ub294 \uc11c\ube44\uc2a4\ub97c \ub9cc\ub4dc\ub294 \uac78 \uc88b\uc544\ud569\ub2c8\ub2e4.',
          'AI\ub97c \uc11c\ube44\uc2a4 \uae30\ub2a5\uc73c\ub85c \uad6c\ud604\ud558\ub294 \uac1c\ubc1c\uc5d0 \uc9d1\uc911\ud558\uace0 \uc788\uace0, \uc6b4\uc601 \uacbd\ud5d8\uc744 \ubc14\ud0d5\uc73c\ub85c \uac1c\ubc1c\uc790\ub85c \uc804\ud658\ud558\uc5ec LLM/RAG \uae30\ubc18 \ud504\ub85c\uc81d\ud2b8\ub97c \uc218\ud589\ud558\uba70 \ub370\uc774\ud130\ubd80\ud130 API, \uc11c\ube44\uc2a4\uae4c\uc9c0 \uc774\uc5b4 \ubd99\uc774\ub294 \uacbd\ud5d8\uc744 \uc313\uc544 \uc654\uc2b5\ub2c8\ub2e4. \uae30\uc220 \uc911\uc2ec\uc73c\ub85c \uc131\uc7a5\ud558\uba70 AI \uac1c\ubc1c\uc790\uac00 \ub418\uae38 \ud76c\ub9dd\ud558\uace0, \uc6f9\u00b7\ub370\uc774\ud130\u00b7ML\uc744 \ub2e4\ub8e8\ub294 \uc77c\uc5d0 \uad00\uc2ec\uc774 \ub9ce\uc2b5\ub2c8\ub2e4.',
          '\uc6f9\ud398\uc774\uc9c0 \ud504\ub860\ud2b8\uc640 \ubc31\uc5d4\ub4dc \uac1c\ubc1c\ub3c4 \uc9c1\uc811 \ud574 \ubcf4\uc558\uace0, Computer Vision \ubd84\uc57c\uc5d0\uc11c\ub294 YOLO\ub97c \ud65c\uc6a9\ud574 \ud504\ub85c\uc81d\ud2b8\ub97c \uc9c4\ud589\ud574 \ubcf8 \uacbd\ud5d8\uc774 \uc788\uc2b5\ub2c8\ub2e4.',
          'AI\ub97c \uc2e4\uc81c \uc11c\ube44\uc2a4\uc5d0 \uc801\uc6a9\ud574 \uac00\uce58\ub97c \ub9cc\ub4dc\ub294 \uac1c\ubc1c\uc790\ub85c \uae30\uc5ec\ud558\uace0 \uc2f6\uc2b5\ub2c8\ub2e4. \uad81\uae08\ud55c \uc810\uc774 \uc788\uc73c\uc2dc\uba74 \uc544\ub798 \uc5f0\ub77d\ucc98\ub85c \ud3b8\ud558\uac8c \ubcf4\ub0b4\uc8fc\uc138\uc694.',
        ],
      },
      education: {
        title: 'Education',
        intro: '\uc774\uc218\ud55c \uad50\uc721 \ubc0f \uc5f0\uc218 \uacfc\uc815\uc785\ub2c8\ub2e4.',
        hint: '\uad50\uc721\uae30\uad00\uba85\uc744 \ud074\ub9ad\ud558\uc2dc\uba74 \uc218\ub8cc\uc99d\uc744 \ud655\uc778\ud558\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
        certPdfTitle: '\uc218\ub8cc\uc99d PDF',
        certCountTitle: '\uc218\ub8cc\uc99d {n}\uac74 \u2014 \ud3bc\uccd0\uc11c \uc120\ud0dd',
        certBadge: '\u00b7 \uc218\ub8cc\uc99d {n}',
        certFallback: '\uc774\uc218\uc99d {n}',
        certRound: '{n}\ud68c\ucc28',
        certSec: '\uc815\ubcf4\ubcf4\uc548 {n}',
        certLinux: '\ub9ac\ub205\uc2a4 {n}',
        certCisco: '\uc528\uc2a4\ucf54 {n}',
        certCourseSubject: '\uacfc\ubaa9 \uc774\uc218\uc99d {n}',
        certBootcampDoc: '\uad50\uc721\uae30\uad00 \uc218\ub8cc\uc99d',
      },
      projects: {
        desc: '\uadf8\ub3d9\uc548 \uac1c\ubc1c\ud55c \ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4.',
        prevAria: '\uc774\uc804 \ud504\ub85c\uc81d\ud2b8',
        nextAria: '\ub2e4\uc74c \ud504\ub85c\uc81d\ud2b8',
        add: '+ Add Project',
        empty:
          '\ub4f1\ub85d\ub41c \ud504\ub85c\uc81d\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "\ud504\ub85c\uc81d\ud2b8 \ucd94\uac00"\ub85c \uccab \ud504\ub85c\uc81d\ud2b8\ub97c \uc62c\ub824\ubcf4\uc138\uc694.',
        noTitle: '\uc81c\ubaa9 \uc5c6\uc74c',
        demo: '\ubcf4\uae30',
        code: '\ucf54\ub4dc',
        academy: '\uad50\uc721\uae30\uad00 \ud504\ub85c\uc81d\ud2b8',
        personal: '\uac1c\uc778 \ud504\ub85c\uc81d\ud2b8',
        outsourced: '\uc678\uc8fc \ud504\ub85c\uc81d\ud2b8',
        filterAria:
          '\ud504\ub85c\uc81d\ud2b8 \uc720\ud615\uc73c\ub85c \ubcf4\uae30',
        filterAll: '\uc804\uccb4',
        filterPersonal: '\uac1c\uc778',
        filterAcademy: '\uad50\uc721\uae30\uad00',
        filterOutsourced: '\uc678\uc8fc',
        filterEmpty:
          '\uc774 \ubd84\ub958\uc5d0 \ud574\ub2f9\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.',
        deleteAria: '\uc0ad\uc81c',
        alertImageSize: '\uc774\ubbf8\uc9c0\ub294 400KB \uc774\ud558\ub85c \uc62c\ub824\uc8fc\uc138\uc694.',
      },
      skills: {
        tabTrackAria: '\uc2a4\ud0ac \ubd84\uc57c',
        tabTierAria: '\uc219\ub828\ub3c4',
        trackCommon: '\uacf5\ud1b5',
        tierStrong: '\uc8fc\ub825',
        tierExp: '\uacbd\ud5d8',
        contextPrefix: '\ud604\uc7ac \ubd84\ub958',
        contextCommonSuffix: '\ud611\uc5c5\u00b7\uc778\ud504\ub77c \uacf5\ud1b5',
        empty: '\uc774 \uc870\ud569\uc5d0 \ud574\ub2f9\ud558\ub294 \ud56d\ubaa9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.',
      },
      awards: {
        title: 'Award',
        intro: '\uad50\uc721 \uacfc\uc815 \ub4f1\uc5d0\uc11c \ubc1b\uc740 \uc218\uc0c1 \uc2e4\uc801\uc785\ub2c8\ub2e4.',
        colDate: '\ub0a0\uc9dc',
        colName: '\uc218\uc0c1\uba85',
        colIssuer: '\ubc1c\uae09\ucc98',
        pdfTitleTemplate: '{label} PDF (\uc0c8 \ucc3d)',
      },
      certificates: {
        title: 'Certificates',
        desc: '\uad6d\uac00\u00b7\uae30\uad00\uc5d0\uc11c \ubc1c\uae09\ud55c \uc790\uaca9\u00b7\uba74\ud5c8\uc785\ub2c8\ub2e4.',
        add: '+ Add Certificate',
        colDate: '\ucde8\ub4dd\uc77c\uc790',
        colCountry: '\uad6d\uac00',
        colName: '\uc790\uaca9\uc99d/\uba74\ud5c8\uc99d',
        colGrade: '\ub4f1\uae09',
        colIssuer: '\ubc1c\uae09\ucc98',
        pdfTitle: '\uc790\uaca9\uc99d PDF (\uc0c8 \ucc3d)',
        addNeedMedia: '\uc0c1\uc7a5 \uc774\ubbf8\uc9c0 \ub610\ub294 PDF\ub97c \ub123\uc5b4\uc8fc\uc138\uc694.',
        alertPdfTooBig: 'PDF\ub294 2MB \uc774\ud558\ub85c \uc62c\ub824\uc8fc\uc138\uc694.',
        alertImageTooBig: '\uc774\ubbf8\uc9c0\ub294 400KB \uc774\ud558\ub85c \uc62c\ub824\uc8fc\uc138\uc694.',
        deleteAria: '\uc0ad\uc81c',
      },
      contact: { title: 'Contact', desc: '\uad81\uae08\ud55c \uc810\uc774 \uc788\uc73c\uc2dc\uba74 \uc544\ub798\ub85c \uc5f0\ub77d \uc8fc\uc138\uc694.' },
      owner: {
        promptPassword: '\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694.',
        wrongPassword: '\ube44\ubc00\ubc88\ud638\uac00 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
      },
      footer: {
        rights: 'All rights reserved.',
        ownerOn: '\ud3b8\uc9d1 \ubaa8\ub4dc \uc885\ub8cc',
        ownerOff: '\ud3b8\uc9d1 \ubaa8\ub4dc',
        langKo: '\ud55c\uad6d\uc5b4',
        langEn: 'English',
        langAria: '\ud45c\uc2dc \uc5b8\uc5b4',
      },
    },
    en: {
      meta: { title: 'Roy Koh | Developer Portfolio', desc: 'Portfolio of projects and experience.' },
      nav: {
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        skills: 'Skills',
        awards: 'Award',
        certificates: 'Certificates',
        contact: 'Contact',
      },
      reactLinkTitle: 'React portfolio (main)',
      reactLinkAria: 'Go to React main site',
      header: {
        themeToDark: 'Switch to dark mode',
        themeToLight: 'Switch to light mode',
        themeDark: 'Dark mode',
        themeLight: 'Light mode',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
      },
      hero: {
        tag: 'Developer Portfolio',
        typing: "Hello\nI'm Roy,\na developer who builds with code.",
        desc: 'A collection of projects I have built and technologies I have used.',
        viewProjects: 'View projects',
        viewReact: 'Open React site',
        reactBtnTitle: 'React portfolio (main)',
        photoAlt: 'Profile photo of Yongjae Koh',
        logoAlt: 'ROY.K logo',
      },
      about: {
        title: 'About',
        name: 'Name',
        nameValue: '\uace0\uc6a9\uc7ac',
        birth: 'Date of birth',
        nameEn: 'English name',
        nameEnValue: 'Koh Yongjae',
        age: 'Age',
        ageUnit: '(international)',
        phoneLink: 'Contact',
        contactCta: 'contact',
        address: 'Location',
        role: 'Focus',
        addressValue: 'Nowon-gu, Seoul',
        roleValue: 'LLM Developer',
        photoAlt: 'Profile photo of Yongjae Koh',
        intro: [
          'Hello.',
          "I'm ROY (Yongjae Koh), a developer who enjoys building services that feel easy and pleasant to use.",
          'I focus on shipping AI as product features. Drawing on operations experience, I moved into development and have worked on LLM/RAG projects\u2014connecting data, APIs, and services end to end. I want to grow as an AI engineer and care about web, data, and ML work.',
          'I have hands-on experience with front-end and back-end web development, and in computer vision I have delivered projects using YOLO.',
          'I hope to contribute as a developer who applies AI in real products and creates value. If you have any questions, feel free to reach out below.',
        ],
      },
      education: {
        title: 'Education',
        intro: 'Training and courses I have completed.',
        hint: ' Click an institution name to open the certificate PDF.',
        certPdfTitle: 'Certificate PDF',
        certCountTitle: '{n} certificates \u2014 expand to choose',
        certBadge: '\u00b7 {n} certificates',
        certFallback: 'Certificate {n}',
        certRound: 'Session {n}',
        certSec: 'Information Security {n}',
        certLinux: 'Linux {n}',
        certCisco: 'Cisco {n}',
        certCourseSubject: 'Course certificate {n}',
        certBootcampDoc: 'Bootcamp certificate',
      },
      projects: {
        desc: 'Projects I have built.',
        prevAria: 'Previous project',
        nextAria: 'Next project',
        add: '+ Add Project',
        empty: 'No projects yet. Use \u201cAdd Project\u201d to add the first one.',
        noTitle: 'Untitled',
        demo: 'Demo',
        code: 'Code',
        academy: 'Bootcamp / academy',
        personal: 'Personal',
        outsourced: 'Client / outsourced',
        filterAria: 'Filter projects by type',
        filterAll: 'All',
        filterPersonal: 'Personal',
        filterAcademy: 'Academy',
        filterOutsourced: 'Client',
        filterEmpty: 'No projects in this category.',
        deleteAria: 'Delete',
        alertImageSize: 'Please use images under 400 KB.',
      },
      skills: {
        tabTrackAria: 'Skill track',
        tabTierAria: 'Proficiency',
        trackCommon: 'Common',
        tierStrong: 'Main',
        tierExp: 'Experience',
        contextPrefix: 'Current view',
        contextCommonSuffix: 'collaboration & infra (common)',
        empty: 'Nothing to show for this combination.',
      },
      awards: {
        title: 'Award',
        intro: 'Awards received during training and related programs.',
        colDate: 'Date',
        colName: 'Award',
        colIssuer: 'Issuer',
        pdfTitleTemplate: '{label} PDF (new tab)',
      },
      certificates: {
        desc: 'Licenses and certifications issued by organizations.',
        add: '+ Add Certificate',
        colDate: 'Date',
        colCountry: 'Country',
        colName: 'License / certificate',
        colGrade: 'Level',
        colIssuer: 'Issuer',
        pdfTitle: 'Certificate PDF (new tab)',
        addNeedMedia: 'Please add a certificate image or PDF.',
        alertPdfTooBig: 'Please keep PDFs under 2 MB.',
        alertImageTooBig: 'Please use images under 400 KB.',
        deleteAria: 'Delete',
      },
      contact: { title: 'Contact', desc: 'Reach out using the links below.' },
      owner: {
        promptPassword: 'Enter password.',
        wrongPassword: 'Incorrect password.',
      },
      footer: {
        rights: 'All rights reserved.',
        ownerOn: 'Exit edit mode',
        ownerOff: 'Edit mode',
        langKo: 'Korean',
        langEn: 'English',
        langAria: 'Display language',
      },
    },
  }

  var SKILL_GROUP_EN = {
    'API \u00b7 \ubaa8\ub378': 'API \u00b7 Model',
    'Notebook \u00b7 \ud658\uacbd \u00b7 \uc2e4\ud5d8': 'Notebook \u00b7 Environment \u00b7 Experiment',
    'BaaS \u00b7 \ud638\uc2a4\ud305': 'BaaS \u00b7 Hosting',
    'Backend \u00b7 \uc11c\ube59': 'Backend \u00b7 Serving',
    'Data \u00b7 \ud3c9\uac00': 'Data \u00b7 Evaluation',
    \ubc30\ud3ec: 'Deployment',
    '\ubc30\ud3ec \u00b7 \ucd94\ub860': 'Deployment \u00b7 Inference',
    'Desktop \u00b7 \ub77c\ubca0\ub9c1': 'Desktop \u00b7 Labeling',
  }

  /** React `src/data/awards.js` `awardGroups` 와 동일: 발급처 순서·행 날짜 내림차순 */
  var STATIC_AWARD_GROUPS = [
    {
      issuerKo: '\ud734\uba3c AI \uad50\uc721\uc13c\ud130',
      issuerEn: 'Human AI Training Center',
      items: [
        { date: '2026.03', titleKo: '\uac1c\uadfc\uc0c1', titleEn: 'Perfect Attendance Award', pdf: '%EC%88%98%EC%83%81/%ED%9C%B4%EB%A8%BC%20%EA%B0%9C%EA%B7%BC%EC%83%81.pdf' },
        { date: '2026.03', titleKo: '\uc790\ub3d9\ud654 \ud504\ub85c\uc81d\ud2b8 \ucd5c\uc6b0\uc218\uc0c1', titleEn: 'Grand Prize \u2014 Automation Project', pdf: '%EC%88%98%EC%83%81/%ED%9C%B4%EB%A8%BC%20%EC%9E%90%EB%8F%99%ED%99%94%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B5%9C%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
      ],
    },
    {
      issuerKo: '\uc54c\ud30c\ucf54 (Alphaco)',
      issuerEn: 'Alphaco',
      items: [
        { date: '2025.11', titleKo: '\ucd9c\uc11d \uc6b0\uc218\uc0c1', titleEn: 'Excellence Award \u2014 Attendance', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%EC%B6%9C%EC%84%9D%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.08', titleKo: '\ud0dc\ub3c4 \uc6b0\uc218 \uad50\uc721\uc0c1', titleEn: 'Excellence Award \u2014 Attitude', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%83%9C%EB%8F%84%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.07', titleKo: '\ud559\uc2b5 \uc6b0\uc218\uc0c1', titleEn: 'Excellence Award \u2014 Learning', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%95%99%EC%8A%B5%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.07', titleKo: '\uc790\uc5f0\uc5b4 \ucc98\ub9ac(NLP) \ubc0f LLM \ud504\ub85c\uc81d\ud2b8 \uc6b0\uc218\uc0c1', titleEn: 'Excellence Award \u2014 NLP & LLM Project', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
      ],
    },
  ]

  var STATIC_LICENSE_ROW = {
    date: '2024. 09',
    countryKo: '\ub300\ud55c\ubbfc\uad6d',
    countryEn: 'South Korea',
    titleKo: '\ub9ac\ub205\uc2a4 \ub9c8\uc2a4\ud130',
    titleEn: 'Linux Master',
    gradeKo: '2\uae09',
    gradeEn: 'Lv. 2',
    issuerKo: 'KAIT \uc815\ubcf4\ud1b5\uc2e0 \uae30\uc220 \uc790\uaca9 \uac80\uc815',
    issuerEn: 'KAIT (Korea Association for ICT Promotion)',
    pdf: '\uc790\uaca9\uc99d/%EB%A6%AC%EB%88%85%EC%8A%A4%EB%A7%88%EC%8A%A4%ED%84%B0.pdf',
  }

  /** GitHub Pages PDF \uacbd\ub85c (index.html \uacfc \ub3d9\uc77c \uc778\ucf54\ub529) */
  var EDU = [
    { pKo: '2026.03 ~ \uc9c4\ud589\uc911', pEn: '2026.03 \u2014 In progress', cKo: 'AI \ub17c\ubb38 \uc791\uc131', cEn: 'AI research paper writing', oKo: '\ud734\uba3c AI \uad50\uc721\uc13c\ud130', oEn: 'Human AI Training Center', kind: 'text' },
    { pKo: '2025.12 ~ 2026.03', pEn: '2025.12 \u2014 2026.03', cKo: '\uc2ec\ud654_\uc2ec\uce35 \ub370\uc774\ud130 \ubd84\uc11d\uc744 \ud1b5\ud55c \uc11c\ube44\uc2a4 \uc194\ub8e8\uc158 \uac1c\ubc1c\uc790 \uacfc\uc815', cEn: 'Advanced: service solution development through deep data analytics', oKo: '\ud734\uba3c AI \uad50\uc721\uc13c\ud130', oEn: 'Human AI Training Center', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%B6%84%EC%84%9D%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2025.04 ~ 2025.11', pEn: '2025.04 \u2014 2025.11', cKo: 'AI \uac1c\ubc1c\uc790 \ub9c8\uc2a4\ud130 \uacfc\uc815', cEn: 'AI Developer Master Course', oKo: '\uc54c\ud30c\ucf54', oEn: 'Alphaco', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/AI%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2025.02 ~ 2025.03', pEn: '2025.02 \u2014 2025.03', cKo: '\ub3c4\ucee4 & \ucfe0\ubc84\ub124\ud2f0\uc2a4', cEn: 'Docker & Kubernetes', oKo: '\uc194\ub370\uc2a4\ud06c', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%8F%84%EC%BB%A4%20&%20%EC%BF%A0%EB%B2%84%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2024.08 ~ 2024.09', pEn: '2024.08 \u2014 2024.09', cKo: '\ub9ac\ub205\uc2a4 \uc2dc\uc2a4\ud15c \uad00\ub9ac \ubc0f Ansible \uc790\ub3d9\ud654 \uae30\uc220', cEn: 'Linux administration & Ansible automation', oKo: '\uc194\ub370\uc2a4\ud06c', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A4%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2024.06 ~ 2024.07', pEn: '2024.06 \u2014 2024.07', cKo: '\uc11c\ubc84\uad6c\uc131 \uc790\ub3d9\ud654\uc640 Ansible \uad6c\uc131', cEn: 'Server provisioning automation & Ansible', oKo: '\uc194\ub370\uc2a4\ud06c', oEn: 'SolDesk', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%84%9C%EB%B2%84%20%EA%B5%AC%EC%84%B11%ED%9A%8C%EC%B0%A8%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '1\ud68c\ucc28' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%84%9C%EB%B2%84%20%EA%B5%AC%EC%84%B1%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '2\ud68c\ucc28' },
    ] },
    { pKo: '2022.11 ~ 2023.05', pEn: '2022.11 \u2014 2023.05', cKo: '\uc815\ubcf4\ubcf4\uc548 1 ~ 6', cEn: 'Information Security 1\u20136', oKo: '\ucf54\ub9ac\uc544 IT \uc544\uce74\ub370\ubbf8', oEn: 'Korea IT Academy', kind: 'multi', n: 6, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%881%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%882%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 2' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%883%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 3' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%884%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 4' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%885%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 5' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%886%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc815\ubcf4\ubcf4\uc548 6' },
    ] },
    { pKo: '2022.10 ~ 2022.11', pEn: '2022.10 \u2014 2022.11', cKo: '\ub9ac\ub205\uc2a4 1 ~ 2', cEn: 'Linux 1\u20132', oKo: '\ucf54\ub9ac\uc544 IT \uc544\uce74\ub370\ubbf8', oEn: 'Korea IT Academy', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A41%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\ub9ac\ub205\uc2a4 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A42%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\ub9ac\ub205\uc2a4 2' },
    ] },
    { pKo: '2022.09 ~ 2022.10', pEn: '2022.09 \u2014 2022.10', cKo: '\uc528\uc2a4\ucf54 1 ~ 2', cEn: 'Cisco 1\u20132', oKo: '\ucf54\ub9ac\uc544 IT \uc544\uce74\ub370\ubbf8', oEn: 'Korea IT Academy', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%94%A8%EC%8A%A4%EC%BD%941%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc528\uc2a4\ucf54 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%94%A8%EC%8A%A4%EC%BD%942%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\uc528\uc2a4\ucf54 2' },
    ] },
    { pKo: '2021.08 ~ 2021.09', pEn: '2021.08 \u2014 2021.09', cKo: '\uc2dc\uc2a4\ucf54 \ub124\ud2b8\uc6cc\ud06c \uad00\ub9ac\uc790 \uae30\ubcf8\uacfc\uc815', cEn: 'Cisco network administrator fundamentals', oKo: '\uc194\ub370\uc2a4\ud06c', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2019.06 ~ 2019.12', pEn: '2019.06 \u2014 2019.12', cKo: '\ud504\ub860\ud2b8 \uc5d4\ub4dc \uac1c\ubc1c \ubc0f \uc790\ubc14 \uac1c\ubc1c\uc790 \uc591\uc131\uacfc\uc815', cEn: 'Front-end & Java developer training', oKo: 'KIC \ucea0\ud37c\uc2a4', oEn: 'KIC Campus', kind: 'multi', n: 12, certs: (function () {
      var a = [{ href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%ED%94%84%EB%A1%A0%ED%8A%B8&%EB%B0%B1%EC%97%94%EB%93%9C%ED%92%80%EC%8A%A4%ED%83%9D%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '\ud559\uc6d0 \uc218\ub8cc\uc99d' }]
      for (var i = 1; i <= 11; i++) {
        a.push({ href: pdfUrl('%EC%9D%B4%EC%88%98%EC%A6%9D/%EC%9D%B4%EC%88%98%EC%A6%9D_' + i + '.pdf'), lab: '\uacfc\ubaa9 \uc774\uc218\uc99d' + i })
      }
      return a
    })() },
    { pKo: '2008.01 ~ 2009.06', pEn: '2008.01 \u2014 2009.06', cKo: '\uc5b4\ud559 \uc5f0\uc218 \ubc0f \ube44\uc988\ub2c8\uc2a4 \ud68c\ud654', cEn: 'Language training & business conversation', oKo: 'TBLNJ \uc5b4\ud559\uc6d0', oEn: 'TBLNJ Language Institute', kind: 'text' },
  ]

  function getLang() {
    // Footer language switching is disabled, so keep legacy page in Korean.
    try { localStorage.setItem(LANG_KEY, 'ko') } catch (e) {}
    return 'ko'
  }

  function setLang(next) {
    // Force Korean while language switching is temporarily disabled.
    var code = 'ko'
    try {
      localStorage.setItem(LANG_KEY, code)
    } catch (e) {}
    document.documentElement.lang = code === 'en' ? 'en' : 'ko'
    applyAll(code)
    global.dispatchEvent(new CustomEvent('portfolio-lang-change', { detail: { lang: code } }))
  }

  function getByPath(obj, path) {
    var parts = path.split('.')
    var cur = obj
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined
      cur = cur[parts[i]]
    }
    return cur
  }

  function interp(str, vars) {
    if (!vars || typeof str !== 'string') return str
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] != null ? String(vars[k]) : '{' + k + '}'
    })
  }

  function t(lang, path) {
    var m = MESSAGES[lang] || MESSAGES.ko
    var v = getByPath(m, path)
    if (typeof v === 'string') return v
    return path
  }

  function certLabel(lang, lab, edu, i) {
    if (lang !== 'en') return lab || interp(edu.certFallback, { n: i + 1 })
    var m = /^(\d+)\ud68c\ucc28$/.exec(lab || '')
    if (m) return interp(edu.certRound, { n: m[1] })
    var jb = /^\uc815\ubcf4\ubcf4\uc548 (\d+)$/.exec(lab || '')
    if (jb) return interp(edu.certSec, { n: jb[1] })
    var lx = /^\ub9ac\ub205\uc2a4 (\d+)$/.exec(lab || '')
    if (lx) return interp(edu.certLinux, { n: lx[1] })
    var cs = /^\uc528\uc2a4\ucf54 (\d+)$/.exec(lab || '')
    if (cs) return interp(edu.certCisco, { n: cs[1] })
    var sj = /^\uacfc\ubaa9 \uc774\uc218\uc99d(\d+)$/.exec(lab || '')
    if (sj) return interp(edu.certCourseSubject, { n: sj[1] })
    if (lab === '\ud559\uc6d0 \uc218\ub8cc\uc99d') return edu.certBootcampDoc
    return lab || interp(edu.certFallback, { n: i + 1 })
  }

  function escapeHtml(s) {
    var d = document.createElement('div')
    d.textContent = s
    return d.innerHTML
  }

  function buildEducationItem(d, lang) {
    var edu = MESSAGES[lang].education
    var pk = lang === 'en' && d.pEn ? d.pEn : d.pKo
    var ck = lang === 'en' && d.cEn ? d.cEn : d.cKo
    var ok = lang === 'en' && d.oEn ? d.oEn : d.oKo
    var certTitle = edu.certPdfTitle
    var html = '<div class="education-item"><div class="timeline-marker" aria-hidden="true"></div><div class="timeline-content">'
    html += '<span class="education-period">' + escapeHtml(pk) + '</span>'
    html += '<strong class="education-course">' + escapeHtml(ck) + '</strong>'
    if (d.kind === 'text') {
      html += '<span class="education-org">' + escapeHtml(ok) + '</span>'
    } else if (d.kind === 'link') {
      html += '<a href="' + escapeHtml(d.href) + '" class="education-org education-org--cert" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(certTitle) + '">' + escapeHtml(ok) + '</a>'
    } else if (d.kind === 'multi') {
      var sumTitle = interp(edu.certCountTitle, { n: d.n })
      var badge = interp(edu.certBadge, { n: d.n })
      html += '<details class="education-org-details"><summary class="education-org education-org--cert education-org--multi" title="' + escapeHtml(sumTitle) + '">' + escapeHtml(ok) + '<span class="education-org-cert-hint" aria-hidden="true"> ' + escapeHtml(badge) + '</span></summary><ul class="education-cert-pick-list">'
      d.certs.forEach(function (c, idx) {
        var lb = certLabel(lang, c.lab, edu, idx)
        html += '<li><a href="' + escapeHtml(c.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(lb) + '</a></li>'
      })
      html += '</ul></details>'
    }
    html += '</div></div>'
    return html
  }

  function renderEducationSplit(lang) {
    var root = document.getElementById('educationSplitRoot')
    if (!root) return
    var left = EDU.slice(0, 6).map(function (d) { return buildEducationItem(d, lang) }).join('')
    var right = EDU.slice(6).map(function (d) { return buildEducationItem(d, lang) }).join('')
    root.innerHTML = '<div class="education-timeline">' + left + '</div><div class="education-timeline">' + right + '</div>'
  }

  function renderAwardTable(lang) {
    var tbody = document.getElementById('staticAwardTbody')
    if (!tbody) return
    var a = MESSAGES[lang].awards
    var colName = a.colName
    var html = ''
    STATIC_AWARD_GROUPS.forEach(function (g) {
      var issuer = lang === 'en' && g.issuerEn ? g.issuerEn : g.issuerKo
      g.items.forEach(function (row, i) {
        var title = lang === 'en' && row.titleEn ? row.titleEn : row.titleKo
        var href = pdfUrl(row.pdf)
        var pdfTitle = interp(a.pdfTitleTemplate, { label: colName })
        html += '<tr>'
        html += '<td>' + escapeHtml(row.date) + '</td>'
        html += '<td><a class="award-pdf-link" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(pdfTitle) + '">' + escapeHtml(title) + '</a></td>'
        if (i === 0) {
          html += '<td rowspan="' + g.items.length + '">' + escapeHtml(issuer) + '</td>'
        }
        html += '</tr>'
      })
    })
    tbody.innerHTML = html
  }

  function renderCertTable(lang) {
    var tbody = document.getElementById('staticCertTbody')
    if (!tbody) return
    var c = MESSAGES[lang].certificates
    var r = STATIC_LICENSE_ROW
    var title = lang === 'en' && r.titleEn ? r.titleEn : r.titleKo
    var country = lang === 'en' && r.countryEn ? r.countryEn : r.countryKo
    var grade = lang === 'en' && r.gradeEn ? r.gradeEn : r.gradeKo
    var issuer = lang === 'en' && r.issuerEn ? r.issuerEn : r.issuerKo
    var href = pdfUrl(r.pdf)
    tbody.innerHTML =
      '<tr><td>' + escapeHtml(r.date) + '</td><td>' + escapeHtml(country) + '</td><td><a class="award-pdf-link" href="' +
      escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(c.pdfTitle) + '">' +
      escapeHtml(title) + '</a></td><td>' + escapeHtml(grade) + '</td><td>' + escapeHtml(issuer) + '</td></tr>'
  }

  function getManAge(year, month, day) {
    var now = new Date()
    var age = now.getFullYear() - year
    var mo = now.getMonth() + 1
    if (mo < month || (mo === month && now.getDate() < day)) age -= 1
    return age
  }

  function applyDataI18n(lang) {
    var m = MESSAGES[lang] || MESSAGES.ko
    if (!m) return
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n')
      var v = getByPath(m, key)
      if (typeof v === 'string') el.textContent = v
    })
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder')
      var v = getByPath(m, key)
      if (typeof v === 'string') el.setAttribute('placeholder', v)
    })
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var raw = el.getAttribute('data-i18n-attr')
      var parts = raw.split('|')
      if (parts.length >= 2) {
        var attr = parts[0].trim()
        var key = parts.slice(1).join('|').trim()
        var v = getByPath(m, key)
        if (typeof v === 'string') el.setAttribute(attr, v)
      }
    })
    var metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && m.meta && m.meta.desc) metaDesc.setAttribute('content', m.meta.desc)
    if (document.title && m.meta && m.meta.title) document.title = m.meta.title

    var introStack = document.querySelector('.about-intro-stack')
    if (introStack && m.about && m.about.intro) {
      introStack.setAttribute('lang', lang === 'en' ? 'en' : 'ko')
      var ps = introStack.querySelectorAll('.about-intro-p')
      m.about.intro.forEach(function (para, i) {
        if (ps[i]) ps[i].textContent = para
      })
    }

    var heroImg1 = document.querySelector('.hero-image-1')
    var heroImg2 = document.querySelector('.hero-image-2')
    var aboutImg = document.querySelector('.about-profile-photo img')
    if (heroImg1 && m.hero && m.hero.photoAlt) heroImg1.setAttribute('alt', m.hero.photoAlt)
    if (heroImg2 && m.hero && m.hero.logoAlt) heroImg2.setAttribute('alt', m.hero.logoAlt)
    if (aboutImg && m.about && m.about.photoAlt) aboutImg.setAttribute('alt', m.about.photoAlt)

    var aboutAgeEl = document.getElementById('about-man-age')
    if (aboutAgeEl && m.about) {
      aboutAgeEl.textContent = m.about.ageUnit + ' ' + getManAge(1988, 10, 20)
    }

    var reactL = document.getElementById('reactMainLink')
    if (reactL && m.reactLinkTitle) reactL.setAttribute('title', m.reactLinkTitle)
    if (reactL && m.reactLinkAria) reactL.setAttribute('aria-label', m.reactLinkAria)
    var heroReact = document.getElementById('heroReactBtn')
    if (heroReact && m.hero) {
      if (m.hero.viewReact) heroReact.textContent = m.hero.viewReact
      if (m.hero.reactBtnTitle) heroReact.setAttribute('title', m.hero.reactBtnTitle)
    }

    var tcom = document.querySelector('[data-i18n-track-common]')
    if (tcom && m.skills) tcom.textContent = m.skills.trackCommon
    var ts = document.querySelector('[data-i18n-tier-strong]')
    if (ts && m.skills) ts.textContent = m.skills.tierStrong
    var te = document.querySelector('[data-i18n-tier-exp]')
    if (te && m.skills) te.textContent = m.skills.tierExp
  }

  function updateFooterLangButtons(lang) {
    var koBtn = document.getElementById('footerLangKo')
    var enBtn = document.getElementById('footerLangEn')
    if (koBtn) {
      koBtn.classList.toggle('is-active', lang === 'ko')
      koBtn.setAttribute('aria-pressed', lang === 'ko' ? 'true' : 'false')
    }
    if (enBtn) {
      enBtn.classList.toggle('is-active', lang === 'en')
      enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false')
    }
  }

  function applyAll(lang) {
    var code = lang === 'en' || lang === 'ko' ? lang : 'ko'
    try {
      applyDataI18n(code)
      renderEducationSplit(code)
      renderAwardTable(code)
      renderCertTable(code)
    } catch (e) {
      if (typeof console !== 'undefined' && console.error) console.error('applyAll', e)
    }
    updateFooterLangButtons(code)
  }

  function bindFooterLang() {
    var koBtn = document.getElementById('footerLangKo')
    var enBtn = document.getElementById('footerLangEn')
    if (koBtn) koBtn.addEventListener('click', function () { setLang('ko') })
    if (enBtn) enBtn.addEventListener('click', function () { setLang('en') })
  }

  global.portfolioGetLang = getLang
  global.portfolioSetLang = setLang
  global.portfolioT = function (path) {
    return t(getLang(), path)
  }
  /** \ud2b9\uc815 \uc5b8\uc5b4\ub85c \ubb38\uc790\uc5f4 \uc870\ud68c (\uc5b8\uc5b4 \uc804\ud658 \uc9c1\ud6c4 getLang \uc9c0\uc5f0 \uc2dc \ud50c\uc81d \uce74\ub4dc\uc6a9) */
  global.portfolioTAt = function (lang, path) {
    var code = lang === 'en' || lang === 'ko' ? lang : getLang()
    return t(code, path)
  }
  global.portfolioSkillTitleEn = function (title) {
    return getLang() === 'en' ? SKILL_GROUP_EN[title] || title : title
  }

  function boot() {
    var lang = getLang()
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko'
    bindFooterLang()
    applyAll(lang)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})(typeof window !== 'undefined' ? window : this)
