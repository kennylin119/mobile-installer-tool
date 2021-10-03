/* eslint-disable no-undef */
import { convertArrayToObject } from '../../../main/component/Icons/Icons';

require('../../../main/component/Icons/Icons');

const sum = (a, b) => a + b;

// Test unit test
test('adds 1 + 2 to equal 3', () => {
  // expect(sum(1, 2).toBe(3));
  expect(1 + 2).toBe(3);
});


// Unit test on convertArrayToObject
test('convertArrayToObject_shouldSucceed', () => {
  const key = 'KeyValue';

  const array = [{ KeyValue: '1', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1_Button.jpg', Label: '1 Button' },
    { KeyValue: '2', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_2_Button.png', Label: '2 Button' },
    { KeyValue: '3', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_3_Button.png', Label: '3 Button' },
    { KeyValue: '11', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_1_Button.png', Label: '1, 1 Button' },
    { KeyValue: '13', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_3_Button.png', Label: '1, 3 Button' },
    { KeyValue: '22', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_2,_2_Button.png', Label: '2, 2 Button' },
    { KeyValue: '31', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_3,_1_Button.png', Label: '3, 1 Button' },
    { KeyValue: '33', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_3,_3_Button.png', Label: '3, 3 Button' },
    { KeyValue: '111', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_1,_1_Button.jpg', Label: '1, 1, 1 Button' },
    { KeyValue: '133', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_3,_3_Button.png', Label: '1, 3, 3 Button' },
    { KeyValue: '222', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_2,_2,_2_Button.png', Label: '2, 2, 2 Button' },
    { KeyValue: '331', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_3,_3,_1_Button.png', Label: '3, 3, 1 Button' },
    { KeyValue: '333', Image: 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_3,_3,_3_Button.png', Label: '3, 3, 3 Button' }];

  const convertedObj = convertArrayToObject(array, key);
  //console.log(convertedObj);
  expect(convertedObj['11']).toHaveProperty('Image', 'toolkit/ALISSE/Toolkit_Definition_Value_Image_BUTTON_ARRAY_1,_1_Button.png');
  expect(convertedObj['111']).toHaveProperty('Label', '1, 1, 1 Button');
});

test('convertArrayToObject_shouldFail', () => {
  const array = [];
  const key = [];

  const convertedObj = convertArrayToObject(array, key);
  //console.log(convertedObj);
});
