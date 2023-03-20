import Button from '../Button/Button';
import { useRouter } from 'next/router'
import { ExclamationOutlined } from '@ant-design/icons';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Input } from 'antd';


const Rule = () => {
    const router = useRouter();
    const { data: session } = useSession()
    return (
        <div className='sl-rule'>
            <div className='sl-rule__label--title'>ตัวแทน 911superlucky</div>
            <div className='sl-rule__label'>หากท่านประสงค์ สมัครเป็นตัวแทน</div>
            <div className='sl-rule__label'>จะต้องปฏิบัติ ตามกติกา ของเรา ดังนี้</div>
            <div className='sl-rule__label'>- จะต้องมีความซื่อสัตว์ กับลูกค้าเป็นสำคัญ</div>
            <div className='sl-rule__label'>- เสริมสร้างมนุษย์สัมพันธ์ที่ดีต่อกัน</div>
            <div className='sl-rule__label'>- จะไม่เปิดเผย ข้อมูลของเว็บไซด์สู่บุคคล ภายนอกอาทิเช่น เบอร์ติดต่อ , ข้อมูลส่วนตัวของลูกค้า ,  เลขบัญชีต่างๆ</div>
            <div className='sl-rule__label'>(ข้อมูล ของท่าน จะถูกปิดเป็นความลับ</div>
            <div className='sl-rule__label'>หากมีข้อสงใสเพิ่มเติม โปรดติดต่อผ่าน</div>
            <div className='sl-rule__label'>line office : @911superlucky เท่านั้น)</div>

            <div className='sl-rule__label'>รายได้ของตัวแทน จะได้จาก 2 ช่องทาง คือ</div>
            <div className='sl-rule__label'>1). รายได้จากยอดซื้อ ของลูกค้า ที่ตัวแทนได้ส่งลิงให้คิดเป็น % จากยอดซื้อตามเรทที่กำหนดไว้</div>
            <div className='sl-rule__label'>2). รายได้จากยอดถูกของลูกค้า</div>
            <div className='sl-rule__label'>ลูกค้าของตัวแทน มีถูกรางวัล</div>
            <div className='sl-rule__label'>ตัวแทนจะมีส่วนได้รางวัลส่วนนั้น ด้วยตามเรท ที่กำหนดไว้</div>
            <div className='sl-rule__label'>เงินจะถูกโอนเข้าบัญชีที่ได้กรอกสมัครไว้กับเรา</div>
            <div className='sl-rule__label'>หลังวันหวยออก 1 วัน เนื่องจาก ขั้นตอนนี้มีการรวมยอดซื้อและยอดถูกจึงต้องผ่านการคำนวนเรทการจ่ายตรวจสอบ เพื่อความถูกต้อง</div>
            <div className='sl-rule__label'>เงินจะถูกโอนเข้าอัตโนมัติ</div>

            <div className='sl-rule__label'>***  เว็บไซด์ 911superlucky ไม่มี นโยบายเรียกเก็บเงิน จากตัวแทนหรือลูกค้า ใดๆทั้งสิ้น ***</div>

            <div className='sl-rule__label'>เรารับตัวแทน จำนวนจำกัด จึงไม่สามารถ กรอกข้อมูลเบื้องต้นและเข้ามาเป็น สมาชิคได้ทันที</div>
            <div className='sl-rule__label'>จะต้องรอผ่านการอนุมัติ</div>
            <div className='sl-rule__label'>เพื่อตรวจสอบข้อมูลเพื่อไม่ให้ พื้นที่การหาลูกค้า ทับซ้อนกัน</div>

            <div className='sl-rule__label'>*หาก account ตัวแทน ไม่มียอดซื้อเข้ามาเป็นระยะเวลา 2 งวด ติดต่อกันจะมี call centerโทรแจ้ง และอาจจะถูก ยกเลิกสิทธิ์ การเป็นตัวแทน</div>
            <div className='sl-rule__label'>*หากตัวแทน ละเมิด กฏกติกา ที่กำหนดทำให้เว็บเสื่อมเสีย จะถูกยกเลิกสิทธิ์การเป็นตัวแทน</div>


            <div className='sl-rule__label'>911 superlucky</div>
            <div className='sl-rule__label'>อัตรา จ่าย</div>
            <div className='sl-rule__label'>อ้างอิง ตามตาราง ที่ส่งไปครับ</div>
        </div>
    );
};

export default Rule;