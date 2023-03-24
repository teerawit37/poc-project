import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import { FacebookOutlined } from '@ant-design/icons';
import LineIcon from '../Button/LineIcon'
export default function Footer() {
    return (
        <div className="sl-footer">
            <div className="sl-footer__label">สอบถามข้อมูลเพิ่มเติม</div>
            <div className="sl-footer__label">เราพร้อมดูแลคุณทุกวัน 24 ชั่วโมง</div>
            <div className="sl-footer__btn-container gap-1">
                <Button type="line"><LineIcon color="white" className="me-2"></LineIcon>@911SuperLucky</Button>
                {/* <Button type="facebook">911SuperLucky</Button> */}
            </div>
            <div className="sl-footer__credit">Copyright © 2023 | 911SuperLucky. All rights reserved.</div>
        </div>
    )
}