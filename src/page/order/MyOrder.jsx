import React, { useEffect, useState } from 'react'
import "./orderProcessing.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useGetMyBillQuery, useLazyGetMyBillQuery } from '../../app/service/orderApi';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyOrder() {
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const [getData, { data, isLoading, isError }] = useLazyGetMyBillQuery();
    const [showModal, setShowModal] = useState(false);

    const [showReason, setReason] = useState(false);
    const [paymentId, setPaymentId] = useState();
    const [selectedOption, setSelectedOption] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [note, setNote] = useState('');
    const natigave = useNavigate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    useEffect(() => {
        getData(auth.id)
    }, [])

    const handleShowModal = (id) => {
        setPaymentId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlenBtnDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8888/api/v1/order/deleteOrder/${paymentId}`);
            toast.success("Hủy đơn hàng thành công !! ! ")
            setShowModal(false);
            getData(auth.id)
        } catch (err) {
            alert(err);
        }
    };


    const handleShowRefund = (id) => {
        setReason(true);
        setPaymentId(id)
    };

    const handleCloseReason = () => {
        setReason(false);
    };

    const handleOptionChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setSelectedOption(selectedValue);

        if (selectedValue === 3) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };






    const handlenBtnReceive = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/receiveOrder/${id}`);
            toast.success("Cảm ơn bạn đã mua hàng của chúng tôi  !! ! ")
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    }

    const deleteItems = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await axios.delete(`http://localhost:8888/api/v1/order/deleteAllOfOrderItem`, config);
            toast.success("Hủy đơn hàng thành công  !! ")
            setShowModal(false);
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    };

    const handlenBtnNotRecceive = async ()=> {
        let text;
        if (selectedOption === 1) {
            text = "I don't like the product"
        }
        if (selectedOption === 2) {
            text = "I haven't received the goods for a long time"
        }
        const objPush = {
            note: selectedOption === 3 ? note : text,
        }
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/notReceiveOrder/${paymentId}`,objPush);
            toast.success("Hoàn đơn hàng  thành công  !! ")
            setReason(false);
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    }

    if (isLoading) {
        return <h2>Is Loading ...</h2>
    }
    return (
        <>

            <br />
            <br />
            <br />
            <section style={{ backgroundColor: '' }}>
                <div className="container py-5">
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>   Hủy đơn hàng </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> Bạn có chắc chắn muốn hủy đơn hàng này  </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button variant="danger" onClick={handlenBtnDelete}>
                                Đồng ý
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {
                        data?.map((e) => (
                            <div className="row justify-content-center mb-3">
                                <div className="col-md-12 col-xl-10">
                                    <div className="card shadow-0 border rounded-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                        <Link>
                                                            <img src={e?.thumbail} className="w-100" />
                                                        </Link>

                                                        <a href="#!">
                                                            <div className="hover-overlay">
                                                                <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6">
                                                    <Link>Mã đơn hàng : {e?.id} </Link>
                                                    <p className="text mb-4 mb-md-0">
                                                        Ngày khởi tạo : <span className='text'>
                                                            {new Date(...e?.createAt).toLocaleDateString()}
                                                        </span>
                                                    </p>
                                                    <p className="text mb-4 mb-md-0">
                                                        Địa chỉ : <span className='text'>{e?.address}</span>
                                                    </p>
                                                    <br />

                                                    <p className="text mb-4 mb-md-0">
                                                        Phương thức thanh toán : <span className='text-danger'>{
                                                            e?.type == 0 ? "Nhận tiền thanh toán" : "Chuyển khoản"
                                                        }</span>
                                                    </p>
                                                    <br />

                                                    <p className="text mb-4 mb-md-0">
                                                        Note: <span className='text'>{e?.text}</span>
                                                    </p>

                                                </div>
                                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                    <div className="d-flex flex-row align-items-center mb-1">
                                                        <h4 className="mb-1 me-1">
                                                            {
                                                                parseFloat(e?.price).toLocaleString('en-US', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0,
                                                                    minimumIntegerDigits: 3,
                                                                })
                                                            }đ
                                                        </h4>

                                                    </div>
                                                    <h6 className="text-danger">
                                                        {
                                                            e?.paymentStatus == "INITIAL" ? (
                                                                <h7>Đang chờ xác nhận</h7>
                                                            ) : (
                                                                <h7>Đang vận chuyển</h7>
                                                            )
                                                        }
                                                    </h6>
                                                    <h6 className="text-success">{
                                                        e?.transport == 0 ? "Vận chuyển thường" : "Vận chuyển nhanh"
                                                    }</h6>
                                                    <div className="d-flex flex-column mt-4">
                                                        {
                                                            e?.paymentStatus == "PROCEED" && (
                                                                <>
                                                                    <button className="btn btn-success btn-sm mx-3 mb-3" onClick={() => handlenBtnReceive(e?.id)} type="button">Đã nhận được hàng</button>
                                                                    <button className="btn btn-warning btn-sm mx-3" onClick={() => handleShowRefund(e?.id)} type="button">Tôi muốn hoàn hàng / không nhận hàng</button>
                                                                </>
                                                            )
                                                        }


                                                        <br />
                                                        <Link to={`/account/getBill/${e?.id}`} className="btn btn-primary btn-sm mx-3 " type="button" style={{ backgroundColor: 'red' }}>Xem chi tiết đơn hàng</Link>
                                                        {
                                                            e?.paymentStatus == "INITIAL" && (
                                                                <>
                                                                    <button onClick={() => handleShowModal(e?.id)} className="btn btn-danger btn-sm mt-2" type="button">
                                                                        Hủy đơn hàng
                                                                    </button>
                                                                </>
                                                            )
                                                        }
                                                        <Modal show={showReason} onHide={handleCloseReason}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Tại sao bạn muốn hủy / không nhận đơn hàng này</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Form>
                                                                    <Form.Group controlId="formReason">
                                                                        <Form.Label>Lý do </Form.Label>
                                                                        <Form.Control as="select" onChange={handleOptionChange} value={selectedOption}>
                                                                            <option value={1}>Tôi không ưng sản phẩm </option>
                                                                            <option value={2}>Tôi chưa nhận được đơn hàng</option>
                                                                            <option value={3}>Lý do khác</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                    {showForm && (
                                                                        <Form.Group controlId="formNote">
                                                                            <Form.Label>Note : </Form.Label>
                                                                            <Form.Control type="text" value={note} onChange={handleNoteChange} />
                                                                        </Form.Group>
                                                                    )}
                                                                </Form>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleCloseReason}>
                                                                    Hủy
                                                                </Button>
                                                                <Button variant="primary" onClick={handlenBtnNotRecceive}>
                                                                    Xác nhận
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                        )
                    }

                    {
                        !data?.length  && (

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">

                                        <div className="card-body cart">
                                            <div className="col-sm-12 empty-cart-cls text-center">
                                                <img src="https://cdn.dribbble.com/users/429792/screenshots/3649946/no_order.png" width={380} height={330} className="img-fluid mb-4 mr-3" />
                                                <h3><strong> Tài Khoản Của Bạn Hiện Tại Chưa Có Đơn Hàng Nào </strong></h3>
                                                <h4>Hãy quay lại và tìm kiếm thêm sản phẩm mà bạn muốn mua nhé !! </h4>
                                                <Link to={"/"} className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp tục mua sắm</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )
                    }
                </div>


            </section>

            <br />

            <br />
            <br />
            <br />
            <br />
            <br />









        </>
    )
}

export default MyOrder