export const FeasibilityStudyJSON = {
    companyDetails: {
        projectId: "",
        farmerId: "",
        farmId: "",
        farmName: "",
        disableCompanyDetailsValues: false
    },
    farmerConsent: {
        actualFileName: "",
        uploadLoc: '',
        disableFarmerValues: false
    },
    machinnarieDetails: {
        isUploadedMachineData: false,
        actualFileName: "",
        uploadLoc: '',
        activities: [{
            "Activity": "",
            "Timing": "",
            "Equipment": "",
            "Tractor Power(in hp)": "",
            "Area Of Activity(in ha)": "",
            "Operations Time(in h/ha)": "",
            "Fuel Consumption(in litre/hour)": "",
            "Number or Runs(per year)": ""
        }]
    },
    feasibilityStudyData: {
        questionsAndAnswers: [
            {
                "1.1": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.2": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "1.2.1": "", "1.2.2": "", "1.2.3": "" }],
            },
            {
                "1.3": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.4": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.5": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.6": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "1.6.1": "", "1.6.2": "", "1.6.3": "", "1.6.4": "" }],
            },
            {
                "1.7": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "1.7.1": "", "1.7.2": "", "1.7.3": "", "1.7.4": "" }],
            },
            {
                "1.8": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.9": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.10": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "1.11": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "2.1": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "2.1.1": "", "2.1.2": "", "2.1.3": "", "2.1.4": "" }],
            },
            {
                "3.1": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "3.1.1": "", "3.1.2": "", "3.1.3": "" }],
            },
            {
                "4.1": "",
                "isHaveSubQuestions": true,
                "subQuestionsAndSubAnswers": [{ "recNo": 1, "4.1.1": "", "4.1.2": "", "4.1.3": "" }],
            },
            {
                "4.2": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "4.3": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "4.4": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "4.5": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "4.6": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            },
            {
                "4.7": "",
                "isHaveSubQuestions": false,
                "subQuestionsAndSubAnswers": []
            }
        ]
    },
    ExtractionDetails: {
        isUploadedPdfFile: true,
        fileNameStoredInAWS: { PdfLocation: '' },
        pdfExtractionData: [{
            "Quantification": "",
            "Year": "",
            "Quantification/ha": "",
            "Region": "",
            "Sequestration": "",
            "Supplier": "",
            "SOC Quantification/ha": "",
            "Number of Grower": "",
            "Reduction": "",
            "Hectares": "",
            "Absolute Potential": "",
            "Potential Reduction": "",
            "Interventions": "",
        }]

    },
}